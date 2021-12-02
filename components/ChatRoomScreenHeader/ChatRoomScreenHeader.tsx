import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, SafeAreaView, SafeAreaViewComponent, Text, useWindowDimensions, View } from "react-native";

const ChatRoomScreenHeader = (props: any) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        width: width - 60,
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent: 'space-between',
        marginLeft: -15
      }}
    >
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"center"
      }}>
        <Image
          source={{
            uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
          }}
          style={{ width: 30, height: 30, borderRadius: 30 }}
        />
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
            paddingLeft: 10

          }}
        >
          Signal
        </Text>
      </View>

      <View style={{
        flexDirection: "row",
      }}>
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