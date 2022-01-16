import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import React, { useState } from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { keyLocalStorage } from "../../constants/Constant";
import { ImageService } from "../../services/image.service";
import { AsyncStorageService } from "../../services/storage.service";
import { RootState } from "../../store/store";
import styles from "./UserProfile.style";
import Storage from "@aws-amplify/storage";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../../src/models";
import { S3Image } from "aws-amplify-react-native";

const UserProfile = () => {
  const userState = useSelector((state: RootState) => state.auth.authUserInfo);
  const { id, imageUri, name, email, dob, phone_number } = userState;
  const [userImage, setUserImage] = useState<any>(imageUri);
  const navigation = useNavigation();
  const logout = () => {
    AsyncStorageService.removeItem(keyLocalStorage.userData);
    navigation.navigate("LoginScreen");
  };

  const updateUserImage = async () => {
    let result = await ImageService.takePhoto();

    if (!result.cancelled) {
      const blob = await ImageService.getImageBlob(result.uri);
      setUserImage(result.uri);
      const date = moment().format();
      const { key } = await Storage.put(`${date}.png`, blob);
      const userProfile: any = await DataStore.query(User, id);
      await DataStore.save(
        User.copyOf(userProfile, (updated) => {
          updated.imageUri = key;
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarUser}>
        <Pressable onPress={updateUserImage}>
          {(imageUri && !imageUri.startsWith('https') ) ? (
            <S3Image
              imgKey={imageUri}
              style={{ width: 80, height: 80, borderRadius: 40 }}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{
                uri: userImage,
              }}
              style={{ width: 80, height: 80, borderRadius: 40 }}
            />
          )}
        </Pressable>
      </View>

      <View style={styles.userProfileInputData}>
        <View style={styles.profileItem}>
          <Text>Email</Text>
          <TextInput style={styles.profileItemInput} value={email} />
        </View>

        <View style={styles.profileItem}>
          <Text>Name</Text>
          <TextInput style={styles.profileItemInput} value={name} />
        </View>

        <View style={styles.profileItem}>
          <Text>Birthday</Text>
          <TextInput
            style={styles.profileItemInput}
            value={dob ? dob : "Not update"}
          />
        </View>

        <View style={styles.profileItem}>
          <Text>Phone number</Text>
          <TextInput
            style={styles.profileItemInput}
            value={phone_number ? phone_number : "Not update"}
          />
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
