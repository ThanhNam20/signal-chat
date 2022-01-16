import { DataStore } from "@aws-amplify/datastore";
import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import ChatRoomItem from "../components/ChatRoomItem";
import { keyLocalStorage } from "../constants/Constant";
import { AsyncStorageService } from "../services/storage.service";
import { ChatRoom, UserChatRoom } from "../src/models";
import { setUserData } from "../store/auth/AuthSlice";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({}: RootTabScreenProps<"TabOne">) {
  const [chatRooms, setChatRooms] = React.useState<ChatRoom[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  React.useEffect(() => {
    getUserLoginData();
  }, []);
  
  const getUserLoginData = async () => {
    const userData = await AsyncStorageService.getItem(
      keyLocalStorage.userData
    );
    if (!userData) {
      return;
    } else {
      getChatRooms(userData);
    }
  };

  const getChatRooms = async (userData: any) => {
    dispatch(setUserData(userData))
    const chatRooms = (await DataStore.query(UserChatRoom))
      .filter((chatRoomItem) => chatRoomItem.user.id == userData.id)
      .map((chatRoomItem) => chatRoomItem.chatRoom);
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
