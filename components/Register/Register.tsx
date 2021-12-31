import { useNavigation } from "@react-navigation/core";
import { unwrapResult } from "@reduxjs/toolkit";
import CryptoES from "crypto-es";
import { Formik } from "formik";
import { Box, Button, FormControl, Heading, Input, VStack } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { defaultMessage, keyLocalStorage } from "../../constants/Constant";
import { AsyncStorageService } from "../../services/storage.service";
import { register } from "../../store/auth/AuthSlice";
import { setMessage } from "../../store/message/MessageSlice";
import { RegisterValidate } from "./Register.validate";

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onSubmitRegister = async (values: any) => {
    const userRegister: any = await dispatch(
      register({
        email: values.email,
        name: values.name,
        password: values.password,
      })
    );
    const userRegisterData = unwrapResult(userRegister);
    if (!userRegisterData) {
      return;
    }
    await AsyncStorageService.setItem(
      userRegisterData,
      keyLocalStorage.userData
    );

    // const getUserLocalStorageData = await AsyncStorageService.getItem(
    //   keyLocalStorage.userData
    // );
    navigation.navigate("Root");
  };

  return (
    <Box safeArea flex={1} p={2} w="90%" mx="auto" justifyContent="center">
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
          <Formik
            initialValues={{
              email: "",
              name: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={RegisterValidate}
            onSubmit={(values) => onSubmitRegister(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
                <Input
                  onChangeText={handleChange("email")}
                  value={values.email}
                  placeholder="Email"
                  pt="4"
                  pb="4"
                />
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}

                <Input
                  onChangeText={handleChange("name")}
                  value={values.name}
                  mt="5"
                  placeholder="Username"
                  pt="4"
                  pb="4"
                />
                {errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}

                <Input
                  onChangeText={handleChange("password")}
                  value={values.password}
                  mt="5"
                  placeholder="Password"
                  type="password"
                  pt="4"
                  pb="4"
                />
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}

                <Input
                  onChangeText={handleChange("passwordConfirmation")}
                  value={values.passwordConfirmation}
                  mt="5"
                  placeholder="Repress Password"
                  type="password"
                  pt="4"
                  pb="4"
                  mb="3"
                />
                {errors.passwordConfirmation ? (
                  <Text style={styles.errorText}>
                    {errors.passwordConfirmation}
                  </Text>
                ) : null}

                <Button onPress={handleSubmit} mt="2" colorScheme="indigo">
                  Sign up
                </Button>
              </View>
            )}
          </Formik>
        </FormControl>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
  },
});

export default Register;
