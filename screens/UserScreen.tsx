import { DataStore } from '@aws-amplify/datastore'
import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserItem from '../components/UserItem'
import { User } from '../src/models'

const UserScreen = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // query user from aws
  const fetchUsers = async () => {
    const fetchedUsers = await DataStore.query(User);    
    setUsers(fetchedUsers);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={(({ item }) =>
          <UserItem user = {item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  }
});
export default UserScreen;
