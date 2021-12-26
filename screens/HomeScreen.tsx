import { DataStore } from "@aws-amplify/datastore";
import * as React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ChatRoomItem from "../components/ChatRoomItem";
import { ChatRoom, UserChatRoom } from "../src/models";
import { getUserAuhthenticationData } from "../store/auth/AuthSlice";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [chatRooms, setChatRooms] = React.useState<ChatRoom[]>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    getChatRooms();
  }, []);

  const getChatRooms = async () => {
    const userData: any = await dispatch(getUserAuhthenticationData());
    const chatRooms = (await DataStore.query(UserChatRoom))
      .filter((chatRoomItem) => chatRoomItem.user.id == userData.payload.attributes.sub)
      .map((chatRoomItem) => chatRoomItem.chatRoom);

    console.log(chatRooms);  
    setChatRooms(chatRooms);
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoomData={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
