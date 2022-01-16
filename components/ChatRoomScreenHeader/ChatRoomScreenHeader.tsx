import { DataStore } from "@aws-amplify/datastore";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { useSelector } from "react-redux";
import { UserChatRoom } from "../../src/models";
import { RootState } from "../../store/store";
import { S3Image } from "aws-amplify-react-native";

const ChatRoomScreenHeader = ({ id }: any) => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const authUser = useSelector((state: RootState) => state.auth);
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (!id) return;
    const fetchedUsers = (await DataStore.query(UserChatRoom))
      .filter((userChatRoom) => userChatRoom.chatRoom.id === id)
      .map((userChatRoom) => userChatRoom.user);
    const userChat = fetchedUsers.find(
      (user: any) => user.id !== authUser.authUserInfo.id
    );
    setUser(userChat);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        width: width - 60,
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: -15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {user.imageUri && !user.imageUri.startsWith("https") ? (
          <S3Image
            imgKey={user.imageUri}
            style={{ width: 30, height: 30, borderRadius: 30 }}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{
              uri: user.imageUri,
            }}
            style={{ width: 30, height: 30, borderRadius: 30 }}
          />
        )}

        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
            paddingLeft: 10,
          }}
        >
          {user.name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Feather
          name="camera"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
        <Feather
          name="edit-2"
          size={24}
          color="black"
          style={{ marginHorizontal: 5 }}
        />
      </View>
    </View>
  );
};

export default ChatRoomScreenHeader;
