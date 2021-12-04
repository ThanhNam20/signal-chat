import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
} from "native-base"

const Register = () => {
  return (
    <Box safeArea flex={1}
      p={2}
      w="90%"
      mx='auto'
      justifyContent="center"
      >
      <Heading
        size="lg"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
        fontWeight="semibold"
      >
        Welcome
      </Heading>
      <Heading
        mt="1"
        color="coolGray.600"
        _dark={{
          color: "warmGray.200",
        }}
        fontWeight="medium"
        size="xs"
      >
        Sign up to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <Input style={styles.input} placeholder="Email" />
          <Input style={styles.input} mt="5" placeholder="Password" type="password" />
          <Input style={styles.input} mt="5" placeholder="Press again password" type="password" />
        </FormControl>
        <Button mt="2" colorScheme="indigo">
          Sign up
        </Button>
      </VStack>
    </Box>
  )
}

const styles = StyleSheet.create({
  input: {
    lineHeight: 28
  }
})

export default Register
