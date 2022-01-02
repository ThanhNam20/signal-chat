import { useRoute } from '@react-navigation/core';
import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { blue, grey } from '../../constants/Constant';
import { RootState } from '../../store/store';
import styles from './Message.style';
  

const Message = ({message}: any) => {
  const userState = useSelector((state: RootState) => state.auth);
  const isMe = (userState.authUserInfo.id === message.userID)? true : false;
  const route = useRoute();
  
  return (
    <View style ={[
      styles.container,
      {
        backgroundColor: isMe ? blue : grey,
        marginLeft: isMe ? 'auto' : 10,
        marginRight: isMe ? 10 : 'auto'
      }
      ]}>
      <Text style={{color: isMe ? 'white' :'black'}}>{message.content}</Text>
    </View>
  )
}

export default Message;
