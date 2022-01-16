import { DataStore } from "@aws-amplify/datastore";
import { useNavigation } from "@react-navigation/core";
import { S3Image } from "aws-amplify-react-native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Message, User, UserChatRoom } from "../../src/models";
import { RootState } from "../../store/store";
import styles from "./ChatRoomItem.style";

const ChatRoomItem = ({ chatRoomData }: any) => {

  const [user, setUser] = useState<User | any>(null);
  const authUser = useSelector((state: RootState) => state.auth);
  const [lastMessage, setLastMessage] = useState<Message | undefined>();
  const navigation = useNavigation();

  useEffect(() => {
    fetchUsers();
    getLastMessage();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(UserChatRoom))
      .filter((userChatRoom) => userChatRoom.chatRoom.id == chatRoomData.id)
      .map((userChatRoom) => userChatRoom.user);
    const userChat = fetchedUsers.find((user: any) => user.id !== authUser.authUserInfo.id); 
    setUser(userChat);
  };

  const getLastMessage = async () =>{
    if(!chatRoomData.chatRoomLastMessageId) return;
    const lastMessage = (await DataStore.query(Message)).find( message => message.id === chatRoomData.chatRoomLastMessageId);
    setLastMessage(lastMessage);
  }


  const goToConversation = () => {    
    navigation.navigate("ChatRoom", {id: chatRoomData.id});
  };

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <Pressable onPress={goToConversation} style={styles.container}>
        {user.imageUri && !user.imageUri.startsWith("https") ? (
          <S3Image
            imgKey={user.imageUri}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{
              uri: user.imageUri,
            }}
            style={styles.image}
          />
        )}
      {chatRoomData.newMessages > 0 ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoomData.newMessages}</Text>
        </View>
      ) : null}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.text}>{moment(lastMessage?.createdAt).fromNow()}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {lastMessage?.content}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatRoomItem;
