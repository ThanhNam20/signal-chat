import { DataStore } from "@aws-amplify/datastore";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import EmojiSelector from "react-native-emoji-selector";
import { ChatRoom, Message } from "../../src/models";
import styles from "./MessageInput.style";

const MessageInput = ({ props }: any) => {
  const { userId, chatRoom } = props;
  const [message, setMessage] = useState("");
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<any>(false);

  const onPressButtonSend = () => {
    if (message) {
      onSendMessage();
      setMessage("");
    } else {
      return;
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
    setMessage("");
    setIsOpenEmojiPicker(false);
    updateLastMessage(newMessage);
  };

  const updateLastMessage = async (newMessage: any) => {
    DataStore.save(
      ChatRoom.copyOf(chatRoom, (updateChatRoom) => {
        updateChatRoom.LastMessage = newMessage;
      })
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, , { height: isOpenEmojiPicker ? "50%" : "auto" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70}
    >
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
          <Feather name="camera" size={24} color="grey" style={styles.icon} />
          <MaterialCommunityIcons
            name="microphone-outline"
            size={24}
            color="grey"
            style={styles.icon}
          />
        </View>

        <Pressable onPress={onPressButtonSend} style={styles.buttonContainer}>
          {message ? (
            <Ionicons name="send" color="white" size={20} />
          ) : (
            <AntDesign name="plus" size={20} color="white" />
          )}
        </Pressable>
      </View>
      {isOpenEmojiPicker ? (
        <EmojiSelector
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
