import { DataStore } from '@aws-amplify/datastore';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import { View, Image, Text, Pressable, ActivityIndicator } from 'react-native'
import { ChatRoom, User, UserChatRoom } from '../../src/models';
import styles from './ChatRoomItem.style'

const ChatRoomItem = ({ chatRoomData }: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // fetchUsers();
  }, [])

  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(UserChatRoom))
      .filter(userChatRoom => userChatRoom.chatRoom.id == chatRoomData.id)
      .map(userChatRoom => userChatRoom.user);
    console.log(fetchedUsers);
    setUsers(fetchedUsers);
    setUser(fetchedUsers[0]);
  }


  const navigation = useNavigation()

  const goToConversation = () =>{
    navigation.navigate('ChatRoom', chatRoomData.id);
  } 

  if (!user) {
    return <ActivityIndicator />
  }

  return (
    <Pressable  style={styles.container}>
      {/* <Image style={styles.image} source={{ uri: user.imageUri }} />

      { !!chatRoomData.newMessages ? <View style={styles.badgeContainer}>
          <Text style={styles.badgeText} >{chatRoomData.newMessages}</Text>
        </View> : null
      }

      <View style={styles.rightContainer} >
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.text}>{chatRoomData.lastMessage.createdAt}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>{chatRoomData.lastMessage.content}</Text>
      </View> */}
    </Pressable>
  )
}

export default ChatRoomItem
