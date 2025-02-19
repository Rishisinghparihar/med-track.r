import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MedicineCard({ medicine, selectedDate='' }) {
  console.log("MedicineCard Data:", medicine);
  const [status, setStatus]= useState();
  useEffect(()=>{
    CheckStatus();
  },[medicine])
  const CheckStatus=()=>{
    const data = medicine?.action?.find((item)=>item.date===selectedDate);
    console.log('==',data);
    setStatus(data);
  }
  return (
    <View style={styles.view3}>
      <View style={styles.view2}>
        <View style={styles.view1}>
          <Image
            source={{
              uri: medicine?.type?.icon || "https://via.placeholder.com/100",
            }}
            style={{ width: 42, height: 42, opacity: 0.7 }}
          />
        </View>
        <View>
          <Text style={styles.textname}>{medicine?.name}</Text>
          <Text style={styles.when}>{medicine?.whenTime}</Text>
          <Text style={styles.dose}>
            {medicine?.dosage} {medicine?.type?.name}
          </Text>
        </View>
        {status?.date &&<View style={styles.statusContainer}>
          {status?.status=='Taken'?<Ionicons name="checkmark-done" size={18} color="green" />:status?.status=='Missed'&&<AntDesign name="close" size={18} color="red" />}
        </View>}
      </View>
      <View style={styles.clock}>
        <EvilIcons name="clock" size={25} color="black" />
        <Text style={styles.time}>{medicine?.reminder}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  view1: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    marginRight: 10,
    borderRightWidth: 0.5,
    borderRightColor: "gray",
    // borderCurve: "circular",
    // gap: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between'
  },
  view2: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    backgroundColor: "white",
    // margin: 10,
    // padding: 10,
    borderRadius: 12,
    borderWidth: 0.3,
    // elevation: 10,
  },
  view3: {
    backgroundColor: "gray",
    marginTop: 10,
    padding: 4,
    borderRadius: 12,
    borderWidth: 0.3,
    // elevation: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between'
  },
  textname: {
    fontSize: 16,
    fontWeight: "bold",
  },
  when: {
    color: "gray",
    fontSize: 12,
  },
  dose: {
    color: "gray",
    fontSize: 12,
  },
  time: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  clock: {
    flexDirection: "row",
    backgroundColor: "gray",
    padding: 4,
    borderRadius: 0,
    marginTop: 0,
    gap: 5,
  },
  statusContainer:{
    // position: "absolute",
    // top: 5,
    padding:10,
  }
});
