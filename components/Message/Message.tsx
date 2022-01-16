import { DataStore } from "@aws-amplify/datastore";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import { S3Image } from "aws-amplify-react-native";
import React, { useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { useSelector } from "react-redux";
import { blue, grey } from "../../constants/Constant";
import { Message as MessageModel } from "../../src/models";
import { RootState } from "../../store/store";
import styles from "./Message.style";

const Message = ({ message }: any) => {
  const userState = useSelector((state: RootState) => state.auth);
  const { width, height } = useWindowDimensions();
  const isMe = userState.authUserInfo.id === message.userID ? true : false;
  const route = useRoute();
  const [realTimeMessage, setRealtimeMessage] = useState<MessageModel>(message);

  useEffect(() => {
    // get realtime message
    const messagesSub = DataStore.observe(MessageModel, message.id).subscribe(
      (message) => {
        // message.model, message.opType, message.element
        if (message.model === MessageModel && message.opType === "UPDATE") {
          // Update message cũ, nếu để luôn là message.element thì message bị giật
          setRealtimeMessage((msg) => ({ ...msg, ...message.element })); // Ghi de len state cu
        }
      }
    );
    return () => messagesSub.unsubscribe();
  }, []);

  useEffect(() => {
    checkReadMessage();
  }, [isMe, message]);

  const checkReadMessage = async () => {
    if (isMe === false && message.status !== "READ") {
      await DataStore.save(
        MessageModel.copyOf(
          message,
          (updated): any => (updated.status = "READ")
        )
      );
    }
  };

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
      {realTimeMessage.image ? (
        <S3Image
          imgKey={realTimeMessage.image}
          style={{ width: width * 0.7, aspectRatio: 4 / 3 }}
          resizeMode="cover"
        />
      ) : null}
      <Text style={{ color: isMe ? "white" : "black" }}>
        {realTimeMessage.content}
      </Text>
      {isMe &&
        !!realTimeMessage.status &&
        realTimeMessage.status !== "SENT" && (
          <Ionicons
            name={
              realTimeMessage.status === "DELIVERED"
                ? "checkmark"
                : "checkmark-done"
            }
            size={16}
            color="black"
          />
        )}
    </View>
  );
};

export default Message;
