import { DataStore } from "@aws-amplify/datastore";
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import UserItem from "../components/UserItem";
import { User } from "../src/models";
import { RootState } from "../store/store";

const UserScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const authUser = useSelector((state: RootState) => state.auth.authUserInfo);
  useEffect(() => {
    fetchUsers();
  }, []);

  // query user from aws
  const fetchUsers = async () => {
    const fetchedUsers = await DataStore.query(User, (user) =>
      user.id("ne", authUser.attributes.sub)
    );
    console.log(fetchedUsers);
    setUsers(fetchedUsers);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem user={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
export default UserScreen;
