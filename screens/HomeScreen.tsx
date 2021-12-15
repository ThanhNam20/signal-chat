import Auth from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';
import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ChatRooms from '../assets/dummy-data/ChatRooms';
import ChatRoomItem from '../components/ChatRoomItem';
import { UserChatRoom } from '../src/models';
import { ChatRoom } from '../src/models';
import { RootTabScreenProps } from '../types';


export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [chatRooms, setChatRooms] = React.useState<ChatRoom[]>();




  React.useEffect(() => {
    getChatRooms();
  }, [])

  const getChatRooms = async () =>{
    const userData = await Auth.currentAuthenticatedUser();

    const chatRooms = (await DataStore.query(UserChatRoom))
    .filter(chatRoomItem => chatRoomItem.user.id == userData.attributes.sub)
    .map(chatRoomItem => chatRoomItem.chatRoom);
    console.log(chatRooms);
    setChatRooms(chatRooms);
  }

  const roomMessageData = ChatRooms;

  return (
    <SafeAreaView  style={styles.container}>
    <FlatList
        data={chatRooms}
        renderItem={(({ item }) =>
          <ChatRoomItem chatRoomData={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  }
});
