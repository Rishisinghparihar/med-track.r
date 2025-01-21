import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import colors from '../../constant/colors'
import {router, useRouter} from 'expo-router'
export default function LoginScreen() {
    const router= useRouter()
    return (
    <View>
        <View
        style={{
            display:'flex',
            alignItems:'center',
            marginTop:120,

        }}>
            <Image source={require('./../../assets/images/img-1.png')}
            style={styles?.Image}
            />
        </View>
        <View
        style={{
            padding:25,
            display:'flex',
            alignItems:'center',
            // justifyContent:'center',
            backgroundColor:colors.PRIMARY,
            height:'300%'
        }}>
            <Text
            style={{
                color:'white',
                fontSize:36,
                fontWeight:'bold'
            }}
            >Want to continue, just login...</Text>
        <Text
        style={{
            color:'white',
            fontSize:17,
            marginTop:27,
            // fontWeight:'bold'
        }}>"Stay on Track, Stay Healthy: Your Smart Medicine Companion."</Text>
        <TouchableOpacity
        onPress={()=>router.push('/login/signIn')}
        >
            <Text style={styles?.button}>continue</Text>
        </TouchableOpacity>
        <Text
        style={{
            color:'white',
            fontSize:15,
            marginTop:10,
            padding:10
            // fontWeight:'bold'
        }}
        >Note: By clicking continue you accept our terms and conditions</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    Image:{
        width: 100,
        height: 100,
        // resizeMode: 'contain',
    },
    button:{
        padding:15,
        // color:'white',
        fontSize:17,
        marginTop:50,
        fontWeight:'bold',
        backgroundColor:'white',
        borderRadius:50
    }
})
