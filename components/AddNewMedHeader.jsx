import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useRouter } from 'expo-router';

export default function AddNewMedHeader() {
    const router = useRouter();
  return (
    <View>
        <View>
            <Image source={require('./../assets/images/patient-doctor.jpg')}
            style={styles.image}>
            </Image>
            <TouchableOpacity 
            style={styles.icon}
            onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width:'100%', // Specify the desired width of the image
        height:250, // Specify the desired height of the image
        // resizeMode: 'contain', // Maintain aspect ratio 
        // marginLeft:'30%',
        paddingTop:10,
    },
    icon:{
        position:'absolute',
        paddingTop:15,
        marginLeft:15,
    }
})