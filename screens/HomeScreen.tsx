import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ChatRooms from '../assets/dummy-data/ChatRooms';
import ChatRoomItem from '../components/ChatRoomItem';
import { RootTabScreenProps } from '../types';


export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const roomMessageData = ChatRooms;

  return (
    <SafeAreaView  style={styles.container}>
      <FlatList
        data={roomMessageData}
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
