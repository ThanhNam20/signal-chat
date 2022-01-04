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
    const { key } = await Storage.put(`${date}.png`, blob);

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

  const resetFields = () => {
    setMessage("");
    setIsOpenEmojiPicker(false);
    setImage(null);
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
            {/* <View
              style={{
                height: 5,
                borderRadius: 5,
                backgroundColor: "#3777f0",
                width: `${progress * 100}%`,
              }}
            /> */}
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
          <MaterialCommunityIcons
            name="microphone-outline"
            size={24}
            color="grey"
            style={styles.icon}
          />
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
