import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import styles from './MessageInput.style'
import {
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { DataStore } from '@aws-amplify/datastore';
import { Message } from '../../src/models';
import { ChatRoom } from '../../src/models';

const MessageInput = ({props}: any) => {
  const {userId, chatRoom} = props;
  const [message, setMessage] = useState('');

  const onPressButtonSend = () => {
    if (message) {
      onSendMessage();
      setMessage('');
    } else {return}
  }

  const onSendMessage = async () => {
    const newMessage = await DataStore.save(new Message({
      content: message,
      userID: userId,
      chatroomID: chatRoom.id,
    }))
    setMessage('');
    updateLastMessage(newMessage);
  }

  const updateLastMessage = async (newMessage: any) =>{
    DataStore.save(ChatRoom.copyOf(chatRoom, updateChatRoom =>{
      updateChatRoom.LastMessage = newMessage
    }))
  }

  return (
    <KeyboardAvoidingView
      style={styles.row}
      behavior={Platform.OS === 'ios' ? "padding" : "height"}
      keyboardVerticalOffset={70}
    >
      <View style={styles.inputContainer}>
        <SimpleLineIcons name="emotsmile" size={24} color="#595959" style={styles.icon} />
        <TextInput
          value={message}
          style={styles.input}
          placeholder="Enter message..."
          onChangeText={(setMessage)}
        />
        <Feather name="camera" size={24} color="grey" style={styles.icon} />
        <MaterialCommunityIcons name="microphone-outline" size={24} color="grey" style={styles.icon} />
      </View>

      <Pressable onPress={onPressButtonSend} style={styles.buttonContainer}>
        {message ? <Ionicons name="send" color="white" size={20} /> : <AntDesign name="plus" size={20} color="white" />}
      </Pressable>
    </KeyboardAvoidingView>

  )
}

export default MessageInput
