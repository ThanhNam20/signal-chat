import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Chats from "../assets/dummy-data/Chats";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { ChatRoom, Message as MessageModel } from "../src/models";
import { RootState } from "../store/store";

const ChatRoomScreen = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | any>(null);
  const authUser = useSelector((state: RootState) => state.auth.authUserInfo);

  const route = useRoute<any>();

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);

  useEffect(() => {
    // get realtime message
    const messagesSub = DataStore.observe(MessageModel).subscribe( (message) =>{
      // message.model, message.opType, message.element
      if(message.model === MessageModel && message.opType === 'INSERT'){
        setMessages(existingMessage => [message.element, ...existingMessage]);
      }
    })
    return () => messagesSub.unsubscribe();
  }, [])

  
  const fetchChatRoom = async () => {
    if (!route.params?.id) {
      console.warn("No chatroom id provided");
    }
    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatRoom) {
      console.error("Couldn't find a chatroom with this id");
    } else {
      setChatRoom(chatRoom);
      fetchMessages();
    }
  };

  const fetchMessages = async () => {
    const fetchedMessages = await DataStore.query(
      MessageModel,
      (message) => message.chatroomID("eq", chatRoom?.id),
      {
        sort: (message) => message.createdAt(SortDirection.DESCENDING),
      }
    );
    console.log(fetchedMessages);
    setMessages(fetchedMessages);
  };

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        style={styles.listMessage}
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
      />

      <MessageInput
        props={{
          userId: authUser.attributes.sub,
          chatRoom: chatRoom,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  listMessage: {
    marginBottom: 60,
  }
});

export default ChatRoomScreen;
