import { useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { useSelector } from "react-redux";
import { blue, grey } from "../../constants/Constant";
import { RootState } from "../../store/store";
import styles from "./Message.style";
import { S3Image } from "aws-amplify-react-native";

const Message = ({ message }: any) => {
  const userState = useSelector((state: RootState) => state.auth);
  const { width, height } = useWindowDimensions();
  const isMe = userState.authUserInfo.id === message.userID ? true : false;
  const route = useRoute();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMe ? blue : grey,
          marginLeft: isMe ? "auto" : 10,
          marginRight: isMe ? 10 : "auto",
        },
      ]}
    >
      {message.image ? (
        <S3Image
          imgKey={message.image}
          style={{ width: width * 0.7, aspectRatio: 4 / 3 }}
          resizeMode= "cover"
        />
      ) : null}
      <Text style={{ color: isMe ? "white" : "black" }}>{message.content}</Text>
    </View>
  );
};

export default Message;
