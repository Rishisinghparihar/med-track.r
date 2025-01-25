import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import colors from "../../constant/colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { setLocalStorage } from "../../services/Storage";
// import React from 'react'

export default function signIn() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const onsigninclick = () => {
    if (!email || !password) {
      Alert.alert("Please enter all fields!");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        await setLocalStorage("userDetail", user);
        const setMukeshji = async () => {
          await AsyncStorage.setItem("isLoggedIn", "true");
        };
        setMukeshji();
        router.push("(tabs)");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorCode == "auth/invalid-credentials") {
          // ToastAndroid.show('Email already exist', ToastAndroid.BOTTOM);
          Alert.alert("invalid email or password");
          return;
        }
      });
  };

  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles.textheader}>Sign-In</Text>
      <Text style={styles.subheader}>Welcome back...!</Text>
      {/* <View style={styles.card}> */}
        <View
          style={{
            marginTop: 28,
          }}
        >
          <Text>email</Text>
          <TextInput
            placeholder="email"
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
          />
        </View>
        <View
          style={{
            marginTop: 18,
          }}
        >
          <Text>password</Text>
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <TouchableOpacity onPress={onsigninclick}>
          <Text
            style={styles.button}
            // onPress={()=>router.push('/(tabs)/index')}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.Createbutton}
            onPress={() => router.push("/login/signUp")}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      {/* </View> */}
    </View>
  );
}

export const styles = StyleSheet.create({
  textheader: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },
  subheader: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.SECONDARY,
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    height: 40,
    // margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    backgroundColor: colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    margin: 30,
  },
  Createbutton: {
    fontSize: 20,
    fontWeight: "light",
    color: "black",
    // backgroundColor: colors.PRIMARY,
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  // card: {
  //   width: 300,
  //   height: 200,
  //   backgroundColor: "grey",
  //   borderRadius: 10,
  //   borderColor: "black",
  //   borderWidth: 1,
  //   padding:5,
  //   marginBottom: 5,
  //   paddingBottom: 5,
  // },
});
