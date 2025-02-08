import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter, useSearchParams } from "expo-router/build/hooks";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import moment from "moment";

export default function MedicineAction() {
  const medicine = useLocalSearchParams();
  console.log(medicine);
  const router = useRouter();
  const updateactionstatus = async(status)=>{
    try {
      const docRef= doc(db,'rishi', medicine?.docId);
      await updateDoc(docRef,{
        action: arrayUnion({status:status, time: moment().format('LT'),date: medicine?.selectedDate})
      });
      Alert.alert(status, 'Response-Saved!',[{
        text: 'OK',
        onPress: () => router.replace('(tabs)')
      }])
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View style={styles.View}>
      <MaterialCommunityIcons
        name="bell-ring-outline"
        size={100}
        color="black"
        style={styles.bell}
      />
      <Text style={styles.date}>{medicine?.selectedDate}</Text>
      <Text style={styles.reminder}>{medicine?.reminder}</Text>
      <Text style={styles.msg}>
        please take your {medicine?.dosage} {medicine?.name}'s{" "}
      </Text>
      <View style={styles.btnview}>
        <TouchableOpacity style={styles.button}
        onPress={()=>updateactionstatus('Taken')}
        >
        <MaterialIcons name="done" size={20} color="white" />
          <Text style={styles.btntxt}>
            Taken
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={()=>updateactionstatus('Missed')}
        >
        <FontAwesome6 name="xmark" size={20} color="white" />
          <Text style={styles.btntxt}>
            Missed
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backbtn}
      onPress={()=>router.back()}>
      <AntDesign name="closecircleo" size={28} color="gray" />
      {/* <Text style={styles.gobkbtntxt}></Text> */}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  bell: {
    marginBottom: 20,
    // fontSize:10
  },
  date: {
    marginBottom: 18,
    fontSize: 16,
    fontWeight: "medium",
  },
  reminder: {
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom:10
  },
  msg: {
    fontSize: 16,
    color: "gray",
    marginBottom:20
  },
  btnview:{
    flexDirection:'row',
    justifyContent:'space-between',
    gap:34,
  },
  button:{
    flexDirection:'row',
    // justifyContent:'space-between',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'black',
    padding:10,
    color: "white",
    borderRadius:10,
    borderWidth:0.2,
    gap:5,
  },
  btntxt:{
    color: "white",
    fontSize:11
  },
  backbtn:{
    // flexDirection:'row',
    // justifyContent:'space-between',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'white',
    padding:1,
    color: "white",
    borderRadius:100,
    borderWidth:0.2,
    // gap:5,
    marginTop:130
  },
  // gobkbtntxt:{
  //   color: "gray",
  //   fontSize:15,
  //   // textTransform: "uppercase",
  // }
});
