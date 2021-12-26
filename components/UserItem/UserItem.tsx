import Auth from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';
import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { ChatRoom, User, UserChatRoom } from '../../src/models';
import styles from './UserItem.style'

const UserItem = ({user}: any) => {
  const navigation =  useNavigation();
  
  const createNewChatRoom = async () =>{
    // Todo if there is a already a chatroom between these 2 users
    // then redirect to the existing chat room
    // Ortherwise, Create a new chatroom with these users.  

    // Create a chat room

    const newChatRoom = await DataStore.save(new ChatRoom({
      newMessages: 0,
    }));

    const authUser  = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);

    await DataStore.save( new UserChatRoom({
      userID: dbUser.id,
      user: dbUser,
      chatRoomID: newChatRoom.id,
      chatRoom: newChatRoom
    }))

    // Connect clicked user with the chat room
    await DataStore.save( new UserChatRoom({
      userID: user.id,
      chatRoomID: newChatRoom.id,
      user: user,
      chatRoom: newChatRoom
    }))

    // navigation.navigate('ChatRoom', {id: newChatRoom.id});
} 

  return (
    <Pressable onPress={createNewChatRoom} style={styles.container}>
      <Image style={styles.image} source={{ uri: user.imageUri }} />
      
      <View style={styles.rightContainer} >
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default UserItem
