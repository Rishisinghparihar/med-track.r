// import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../config/FirebaseConfig";
import { getLocalStorage } from "../../services/Storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { auth } from '../../config/FirebaseConfig';
export default function Tablayout() {
  const router = useRouter();

  useEffect(()=>{
    getuserDetail();
  },[])

  //local storage k liye y rha ...
  const getuserDetail= async()=>{
    const userInfo= await getLocalStorage('userDetail');
    if (!userInfo){
      router.replace('/login')
    }
  }

  // const [isLoggedIn, setIsLoggedIn] = useState(null);
  // const[isMounted, setIsMounted]= useState(false) 
  //   useEffect(()=>{setIsMounted(true)},[])

  //   useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const loginStatus = await AsyncStorage.getItem('isLoggedIn');
  //     setIsLoggedIn(loginStatus === 'true'); // Check if logged in
  //   };

  //   checkLoginStatus();
  //   if(isLoggedIn && isMounted){
  //     router.push('(tabs)/AddMed')
  //   }else{
  //     router.push('(tabs)')
  //   }
  // }, []);
  // const [authenticated, setAuthenticated] =useState(null);
  //whether user is already login or not
  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     console.log("uid: " + uid);
  //     setAuthenticated(true);
  //     // ...
  //   } else {
  //     // router?.push('/login')
  //     setAuthenticated(false)
  //     // User is signed out
  //     // ...
  //   }
  // });

  // useEffect(()=>{
  //   if(authenticated==false){
  //     router.push('/login')
  //   }
  // },[authenticated])

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color="color" />
          ),
        }}
      />
      <Tabs.Screen
        name="AddMed"
        options={{
          tabBarLabel: "Add-Medicines",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="capsules" size={size} color="color" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="feed-person" size={size} color="color" />
          ),
        }}
      />
    </Tabs>
  );
}
