import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react'
// import React from 'react'
// import { styles } from './signUp'
import { useRouter } from 'expo-router'
// import { initializeApp } from "firebase/app";
import colors from '../../constant/colors'
// import React from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../../config/FirebaseConfig"
import { useState } from 'react'
import { setLocalStorage } from '../../services/Storage';
export default function signUp() {
  const router= useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const onCreateAccount =()=>{
  
      if (!email || !password || !userName) {
        // ToastAndroid.show('Please fill all fields', ToastAndroid.BOTTOM)
        Alert.alert('Please fill all fields');
        return;
      }
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // console.log(user);

      await updateProfile(user, {
        displayName: userName,
      })

      await setLocalStorage('userDetails', user)
      

    router.push('/(tabs)/AddMed')
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    if(errorCode=='auth/email-already-exist'){
      // ToastAndroid.show('Email already exist', ToastAndroid.BOTTOM);
      Alert.alert('Email already exist');
      return;
    }
    // ..
    });
  }

    return (
     <View style={{
        padding:25
    }}>
      <Text style={
        styles.textheader
      }>Sign-Up</Text>
      <Text style={
        styles.subheader
      }>Hello! buddy , You are new to Med-Track.r </Text>
      {/* <Text style={
        styles.thirdheader
      }>Create a New Account </Text> */}
      <View style={{
        marginTop:8
      }}>
        <Text>full name</Text> 
        <TextInput placeholder='enter you full name' 
        onChangeText={(value)=>setUserName(value)}
        style={styles.input} />
        <Text>email</Text> 
        <TextInput placeholder='email'
        style={styles.input} 
        onChangeText={(value)=>setEmail(value)}
        />
      </View>
      <View style={{
        marginTop:18
      }}>
        <Text>set password</Text>
        <TextInput placeholder='password'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(value)=>setPassword(value)}
        />
        </View>
        {/* <View style={{
        marginTop:28
      }}> */}
        {/* <Text>confirm password</Text>
        <TextInput placeholder='confirm password'
        secureTextEntry={true}
        style={styles.input} /> */}
      {/* </View> */}
      <TouchableOpacity>
        <Text style={styles.button}
        onPress={onCreateAccount}
        // onPress={()=>router.push('/(tabs)/index')}
        >Sign Up
        </Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.Createbutton}
        onPress={()=>router.push('/login/signIn')}
        >already have account? signIn</Text>
      </TouchableOpacity> 
    </View>
  )
}
export const styles= StyleSheet.create({
  textheader:{
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 20    
  }, 
  subheader:{
    fontSize: 35,
    fontWeight: 'bold',
    color:colors.SECONDARY,
    textAlign: 'center',
    marginTop: 20    
  },
    thirdheader:{
    fontSize: 18,
    fontStyle: 'normal',
    color:'black',
    textAlign: 'left',
    marginTop: -38,
    fontWeight:600,
    // backgroundColor:'green'
    },
  input:{
    height: 40,
    // margin: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop:12,
    alignItems: 'center',
    backgroundColor:'white',
  },
  button:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    margin: 30,
  },
  Createbutton:{
    fontSize: 20,
    fontWeight: 'light',
    color: 'black',
    // backgroundColor: colors.PRIMARY,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    marginTop:5,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  }  
})
