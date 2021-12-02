import { NativeBaseProvider, Center } from "native-base"
import * as React from "react"
import Register from "../components/Register"
export const RegisterScreen = () => {
  return (
    <Register/>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center style={{backgroundColor: "white"}} flex={1} px="3">
        <RegisterScreen />
      </Center>
    </NativeBaseProvider>
  )
}
