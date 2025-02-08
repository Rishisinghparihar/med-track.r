import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getDateRangeToDisplay } from '../../services/TimeFormat';
import moment from 'moment';
import { getLocalStorage } from '../../services/Storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { typeList } from '../../constant/options';

export default function history() {
    const [selectedDate, setSelectedDate] = useState(moment().format("DD/MM/YYYY"));
      const [dateRange, setDateRange] = useState();
      const [loading, setLoading]= useState(false);
      const [medList, setMedList]= useState();
      useEffect(() => {
        GetDateList();
        GetMedicationList();
      }, []);
      const GetDateList= ()=>{
        const dates =getDateRangeToDisplay();
        setDateRange(dates);
      }

      const GetMedicationList = async (selectedDate) => {
          setLoading(true);
          const User = await getLocalStorage("userDetail");
          console.log("User:", user);
          try {
            const q = query(
              collection(db, "rishi"),
              where("userEmail", "==", user?.email),
              where("dates", "array-contains", selectedDate)
            );
      
            console.log("Query:", q);
      
            const querySnapshot = await getDocs(q);
            let medications = [];
            querySnapshot.forEach((doc) => {
              console.log("Document Data:", doc.data());
              let data = doc.data();
              let typeInfo = typeList.find((item) => item.name === data.type.name);
              data.type = {
                name: data.type.name,
                icon: typeInfo ? typeInfo.icon : null,
              };
              medications.push(data);
            });
            setMedList(medications);
            console.log("Medications List:", medications);
            setLoading(false);
          } catch (e) {
            console.log("Error fetching medications:", e);
            setLoading(false);
          }
        };
  return (
    <View style={styles.view1}>
      <Text style={styles.htext}>Your History</Text>
      <MaterialIcons name="history-edu" size={160} color="black" />
      {/* <Image source={require('./../../assets/images/four.jpg')} style={styles.img1}></Image> */}
    <FlatList
            data={dateRange}
            horizontal={true}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDate(item.FormateDate);
                  // GetMedicationList(item.FormateDate);
                }}
                style={[
                  styles.view11,
                  {
                    backgroundColor:
                      item.FormateDate === selectedDate ? "yellow" : "white",
                  },
                ]}
                key={index}
              >
                <Text
                  style={[
                    styles.day,
                    { color: item.FormateDate === selectedDate ? "black" : "gray" },
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    { color: item.FormateDate === selectedDate ? "black" : "gray" },
                  ]}
                >
                  {item.FormateDate}
                </Text>
              </TouchableOpacity>
            )}
          />
    </View>
  )
}
const styles = StyleSheet.create({
  view1: {
    // padding: 10,
    // borderRadius: 10,
    // backgroundColor: "white",
    // marginRight: 10,
    // borderRightWidth: 0.5,
    // borderRightColor: "gray",
    // borderCurve: "circular",
    // gap: 10,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img1: {
    // width: 100,
    // height: 160,
    // borderRadius: 20,
    },
  htext: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#001f3f',
    // marginBottom: 10
  },
  view11: {
    backgroundColor: "white",
    margin: 10,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    width: 78,
  },  day: {
    fontSize: 20,
    fontWeight: "bold",
   }, 
    // view1: {
  //   marginTop: 18,
  // },
  four: {
    width: "100%",
    height: 240,
    borderRadius: 25,
  },
})
