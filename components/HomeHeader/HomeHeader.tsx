import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, useWindowDimensions, View } from "react-native";
import { keyLocalStorage } from "../../constants/Constant";
import { AsyncStorageService } from "../../services/storage.service";
import { User } from "../../src/models";

const HomeHeader = (props: any) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [user, setUser] = useState<any>({});
  useEffect(() =>{
    getUserLoginData();
  }, [])

  const getUserLoginData = async () => {
    const userData = await AsyncStorageService.getItem(
      keyLocalStorage.userData
    );
    if (!userData) {
      return;
    }
    setUser(userData)
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width,
        paddingTop: 30,
        paddingHorizontal: 10,
        paddingBottom: 10,
        alignItems: "center",
        backgroundColor: "#E2C2B9"
      }}
    >

      <Pressable onPress={() => navigation.navigate("UserProfileScreen")}>
      <Image
        source={{uri: user.imageUri}}
        style={{ width: 30, height: 30, borderRadius: 30 }}
      />
      </Pressable>

      <Text
        style={{
          flex: 1,
          textAlign: "center",
          marginLeft: 50,
          fontWeight: "bold",
          fontSize: 18
        }}
      >
        Signal
      </Text>
      <Feather
        name="camera"
        size={24}
        color="black"
        style={{ marginHorizontal: 10 }}
      />
      <Pressable onPress={() => navigation.navigate("UserScreen")}>
        <Feather
          name="edit-2"
          size={24}
          color="black"
          style={{ marginHorizontal: 5 }}
        />
      </Pressable>

    </View>
  );
};

export default HomeHeader;