import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, Image, Text, Pressable } from 'react-native'
import styles from './ChatRoomItem.style'

const ChatRoomItem = ({ chatRoomData }: any) => {
  const { id, users, lastMessage, newMessages } = chatRoomData;
  const navigation =  useNavigation()
  
  const goToConversation = () =>{
    navigation.navigate('ChatRoom', id);
  } 

  return (
    <Pressable onPress={goToConversation} style={styles.container}>
      <Image style={styles.image} source={{ uri: users[1].imageUri }} />
      { newMessages ? <View style={styles.badgeContainer}>
          <Text style={styles.badgeText} >{newMessages}</Text>
        </View> : null
      }

      <View style={styles.rightContainer} >
        <View style={styles.row}>
          <Text style={styles.name}>{users[1].name}</Text>
          <Text style={styles.text}>{lastMessage.createdAt}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>{lastMessage.content}</Text>
      </View>
    </Pressable>
  )
}

export default ChatRoomItem
