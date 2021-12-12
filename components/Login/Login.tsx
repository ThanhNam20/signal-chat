import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack
} from "native-base"
import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import { LoginValidate } from './Login.validate';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth/AuthSlice';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSubmitLogin = (values: any) => {
    console.log(values);
    dispatch(login());
  }

  const goToRegisterSreen = () => {
    navigation.navigate("RegisterScreen");
  }

  return (
    <Box safeArea
      flex={1}
      p={2}
      w="90%"
      mx='auto'
      justifyContent="center"
    >
      <Heading
        size="lg"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Welcome
      </Heading>
      <Heading
        mt="1"
        _dark={{
          color: "warmGray.200",
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="xs"
      >
        Sign in to continue!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginValidate}
            onSubmit={values => onSubmitLogin(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
                <Input
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.input}
                  placeholder="Email" />
                {errors.email ? <Text style ={styles.errorText}>{errors.email}</Text> : null}
                <Input
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.input} mt="5" placeholder="Password" type="password" />
                {errors.password ? <Text style ={styles.errorText}>{errors.password}</Text> : null}
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
                </Link>
                <Button onPress={handleSubmit} mt="2" colorScheme="indigo">
                  Sign in
                </Button>

                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    I'm a new user.{" "}
                  </Text>
                  <Link
                    onPress={goToRegisterSreen}
                    _text={{
                      color: "indigo.500",
                      fontWeight: "medium",
                      fontSize: "sm",
                    }}
                  >
                    Sign Up
                  </Link>
                </HStack>
              </View>
            )}
          </Formik>
        </FormControl>
      </VStack>
    </Box>
  )
}

const styles = StyleSheet.create({
  input: {
    lineHeight: 28,
  },
  errorText: {
    color: "red"
  }
})

export default Login;
