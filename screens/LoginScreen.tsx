import * as React from "react"

import { useNavigation } from "@react-navigation/core";
import { NativeBaseProvider, Center } from "native-base";
import Login from "../components/Login";


export const LoginScreen = () => {
  return (
    <Login/>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center style={{backgroundColor: "white"}} flex={1} px="3">
        <LoginScreen />
      </Center>
    </NativeBaseProvider>
  )
}
