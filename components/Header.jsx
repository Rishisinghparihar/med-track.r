import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocalStorage } from '../services/Storage';
import Feather from '@expo/vector-icons/Feather';
import colors from '../constant/colors';

export default function Header() {
  
  const [user, setUser]=useState();
  useEffect(()=>{
    GetUserDetail();
  },[])
//to get user name printed to main home screen
  const GetUserDetail= async()=>{
    // console.log('userInfo');
    const userInfo = await getLocalStorage('userDetail');
    setUser(userInfo);
  }
  
  return (
    <View style={{marginTop:15}}>
      <View style={styles.settings}>
        <View style={styles.container}>
        <Image
        source={require('./../assets/images/header-1.png')}
        style={styles.image}
        />
        <Text 
        style={styles.text}>
        Namastey {user?.displayName} 🙏 </Text>
        </View>
        <Feather name="settings" size={24} color={colors.DARK_BLACK} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    alignItems: 'center', // Center the image horizontally
    gap:10,
    // justifyContent: 'space-between', // Center the image vertically
    // padding: 10, // Optional padding for better layout
  },
  settings:{
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'100%',
  },
  image: {
    width: 55, // Specify the desired width of the image
    height: 55, // Specify the desired height of the image
    // resizeMode: 'contain', // Maintain aspect ratio 
  },
  text:{
    fontSize: 25,
    color: '#000',
    fontWeight:'bold',
    //take the text to one line
    // textAlign:'center',

  }
});
