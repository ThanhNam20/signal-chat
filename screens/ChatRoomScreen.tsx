import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Chats from '../assets/dummy-data/Chats';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';


const ChatRoomScreen = () => {
  const chatDatas = Chats;
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={chatDatas.messages}
        renderItem={({item}) => <Message message={item}/>}
      />
      <MessageInput/>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default ChatRoomScreen;
