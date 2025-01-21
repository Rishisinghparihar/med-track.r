import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import ConstantString from '../constant/ConstantString'
import { useRouter } from 'expo-router';
// import colors from '../constant/colors'

export default function EmptyHome() {

  const router = useRouter();

  return (
    <View 
    style={styles.view1}
    >
        <Image
        source={require('./../assets/images/emptyhome.jpg')}
        style={styles.image}
        ></Image>
        <Text
        style={styles.Text1}
        >Great you are healty.</Text>
        <Text
        style={{ fontSize: 25,
          color: '#000',
          textAlign: 'center',
          margin: 10,
          fontWeight: 'bold',}}
        > {ConstantString.NoMedication}</Text>
    <TouchableOpacity style={{fontSize: 20,
        fontWeight: "bold",
        // color: "white",
        // textcolor: "white",
        textAlign: "center",
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        margin: 20,}}
        
        onPress={()=>{router.push('add-new-med')}}
        >
      <Text style={{color: "white",}}>
          {ConstantString.AddNewMedicines}
      </Text>
    </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    image: {
        // margintop: 0,
        width: 150, // Specify the desired width of the image
        height:150, // Specify the desired height of the image
        resizeMode: 'contain', // Maintain aspect ratio 
        // borderRadius:99, 
    },
      view1: {
        display: 'flex',
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F5F5F5',
        // width: 100,
        // height: 100,
        marginTop: 20,
    },
    Text1:{
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
    },
    // Text2:{
    //     fontSize: 25,
    //     color: '#000',
    //     textAlign: 'center',
    //     margin: 10,
    //     fontWeight: 'bold',
    // },
//     button: {
//         fontSize: 20,
//         fontWeight: "bold",
//         color: "white",
//         textAlign: "center",
//         backgroundColor: colors.PRIMARY,
//         padding: 10,
//         borderRadius: 10,
//         margin: 30,
//       },
})