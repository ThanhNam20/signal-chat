import React from 'react'
import { View, Text } from 'react-native'
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
    <Box safeArea p="2" w="90%" maxW="290" py="8">
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
          <Input  placeholder="Email" />
        </FormControl>
        <FormControl>
          <Input placeholder="Password" type="password" />
        </FormControl>
        <FormControl>
          <Input placeholder="Press again password" type="password" />
        </FormControl>
        <Button mt="2" colorScheme="indigo">
          Sign up
        </Button>
      </VStack>
    </Box>
  )
}

export default Register
