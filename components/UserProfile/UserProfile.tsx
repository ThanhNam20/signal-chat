import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";
import { keyLocalStorage } from "../../constants/Constant";
import { AsyncStorageService } from "../../services/storage.service";
import styles from "./UserProfile.style";

const UserProfile = () => {
  const navigation = useNavigation();
  const logout = () => {
    AsyncStorageService.removeItem(keyLocalStorage.userData);
    navigation.navigate("LoginScreen");
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarUser}>
        <Image
          source={{
            uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
          }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
      </View>

      <View style={styles.userProfileInputData}>
        <View style={styles.profileItem}>
          <Text>Thanh Nam</Text>
          <TextInput style={styles.profileItemInput} />
        </View>

        <View style={styles.profileItem}>
          <Text>Thanh Nam</Text>
          <TextInput style={styles.profileItemInput} />
        </View>

        <View style={styles.profileItem}>
          <Text>Thanh Nam</Text>
          <TextInput style={styles.profileItemInput} />
        </View>

        <View style={styles.profileItem}>
          <Text>Thanh Nam</Text>
          <TextInput style={styles.profileItemInput} />
        </View>
      </View>
      <Pressable onPress={logout}>
        <View style={styles.userProfileInputData}>
          <View style={styles.profileItem}>
            <Text>Logout</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default UserProfile;
