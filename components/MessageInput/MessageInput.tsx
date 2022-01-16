import { DataStore } from "@aws-amplify/datastore";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";

import { Audio, Video } from "expo-av";

import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { ChatRoom, Message, UserChatRoom } from "../../src/models";
import styles from "./MessageInput.style";
import { ImageService } from "../../services/image.service";
import Storage from "@aws-amplify/storage";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const MessageInput = ({ props }: any) => {
  const { userId, chatRoom } = props;
  const [message, setMessage] = useState("");
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<any>(false);
  const authUser = useSelector((state: RootState) => state.auth);
  const [image, setImage] = useState<any>(null);
  const [user, setUser] = useState<any>("");
  const [progress, setProgress] = useState<any>(0);
  const [recording, setRecording] = useState<any>();
  const [sound, setSound] = useState<any>();

  useEffect(() => {
    fetchUsers();
  }, [chatRoom]);

  const fetchUsers = async () => {
    if (!chatRoom) return;
    const fetchedUsers = (await DataStore.query(UserChatRoom))
      .filter((userChatRoom) => userChatRoom.chatRoom.id == chatRoom.id)
      .map((userChatRoom) => userChatRoom.user);
    const userChat = fetchedUsers.find(
      (user: any) => user.id === authUser.authUserInfo.id
    );
    setUser(userChat);
  };

  const pickImage = async () => {
    // Permissions request is necessary for launching the image library
    let result = await ImageService.pickImage();
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImageService.takePhoto();
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const sendImage = async (image: any) => {
    const blob = await ImageService.getImageBlob(image);
    const date = moment().format();
    const { key } = await Storage.put(`${date}.png`, blob, {
      progressCallback,
    });

    const newImage = await DataStore.save(
      new Message({
        content: message ? message : `${user.name} sent a photo.`,
        image: key,
        userID: userId,
        chatroomID: chatRoom.id,
      })
    );
    updateLastMessage(newImage);
  };

  const progressCallback = (progress: any) => {
    setProgress(progress.loaded / progress.total);
  };

  const onPressButtonSend = () => {
    if (!image && !message) return;
    if (image) {
      sendImage(image);
      resetFields();
      return;
    }
    if (message) {
      onSendMessage();
      resetFields();
    }
  };

  const onOpenEmojiPicker = () => {
    setIsOpenEmojiPicker(!isOpenEmojiPicker);
  };

  const onSendMessage = async () => {
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: userId,
        chatroomID: chatRoom.id,
        status: "SENT"
      })
    );
    updateLastMessage(newMessage);
  };

  const updateLastMessage = async (newMessage: any) => {
    DataStore.save(
      ChatRoom.copyOf(chatRoom, (updateChatRoom) => {
        updateChatRoom.LastMessage = newMessage;
      })
    );
  };

  // Audio

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    if (!recording) return;

    setRecording(null);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);

    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
  };

  const playPauseSound = async () => {
    if (!sound) return;
    await sound.playASync();
  };

  const resetFields = () => {
    setMessage("");
    setIsOpenEmojiPicker(false);
    setImage(null);
    setProgress(0);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, , { height: isOpenEmojiPicker ? "50%" : "auto" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70}
    >
      {image && (
        <View style={styles.sendImageContainer}>
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />

          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignSelf: "flex-end",
            }}
          >
            <View
              style={{
                height: 5,
                borderRadius: 5,
                backgroundColor: "#FED1EF",
                width: `${progress * 100}%`,
              }}
            />
          </View>

          <Pressable onPress={() => setImage(null)}>
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={{ margin: 5 }}
            />
          </Pressable>
        </View>
      )}

      {sound && (
        <View style={styles.sendAudioContainer}>
          <Pressable onPress={playPauseSound}>
            <Feather name="play" size={24} color="grey" style={styles.icon} />
          </Pressable>
        </View>
      )}

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            onPress={onOpenEmojiPicker}
            name="emotsmile"
            size={24}
            color="#595959"
            style={styles.icon}
          />
          <TextInput
            value={message}
            style={styles.input}
            placeholder="Enter message..."
            onChangeText={setMessage}
          />

          <MaterialIcons
            onPress={pickImage}
            name="photo-library"
            size={24}
            color="grey"
            style={styles.icon}
          />

          <Feather
            onPress={takePhoto}
            name="camera"
            size={24}
            color="grey"
            style={styles.icon}
          />
          {/* <Pressable onPressIn={startRecording} onPressOut={stopRecording}>
            <MaterialCommunityIcons
              name="microphone-outline"
              size={recording ? 30 : 24}
              color={recording ? "red" : "grey"}
              style={styles.icon}
            />
          </Pressable> */}
        </View>

        <Pressable onPress={onPressButtonSend} style={styles.buttonContainer}>
          {message || image ? (
            <Ionicons name="send" color="white" size={20} />
          ) : (
            <AntDesign name="plus" size={20} color="white" />
          )}
        </Pressable>
      </View>
      {isOpenEmojiPicker ? (
        <EmojiSelector
          category={Categories.emotion}
          onEmojiSelected={(emoji) =>
            setMessage((currentMessgae) => currentMessgae + emoji)
          }
          columns={8}
        />
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
