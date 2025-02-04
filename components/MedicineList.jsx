import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDateRangeToDisplay } from "./../services/TimeFormat";
import moment from "moment";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import MedicineCard from "./MedicineCard";
import { getLocalStorage } from "../services/Storage";
import { db } from "../config/FirebaseConfig";
import AddMedForm from "./AddMedForm";
import { typeList } from "../constant/options";

export default function MedicineList() {
  const [medList, setMedList] = useState();
  const [dateRange, setDateRange] = useState();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD/MM/YYYY")
  );
  useEffect(() => {
    GetDateRangeList();
    GetMedicationList(selectedDate);
  }, []);
  const GetDateRangeList = () => {
    const dateRange = getDateRangeToDisplay();
    console.log(dateRange);
    setDateRange(dateRange);
  };
  const GetMedicationList = async (selectedDate) => {
    const user = await getLocalStorage("userDetail");
    console.log(user);
    try {
      const dateParts = selectedDate.split("/");
    const selectedTimestamp = Timestamp.fromDate(
      new Date(dateParts[2], dateParts[1] - 1, dateParts[0]) // YYYY, MM (0-based), DD
    );

      const q = query(
        collection(db, "rishi"),
        where("useremail", "==", user?.email),
        where("date", "array-contains", selectedTimestamp)
      );
 
      const querySnapshot = await getDocs(q);
      let medications = [];
      setMedList(typeList);
      querySnapshot.forEach((doc) => {
        console.log("docId: "+doc.id, " => ", doc.data());
        setMedList((prev) => [...prev, doc.data()]);
        let data = doc.data();
        let typeInfo = typeList.find((item) => item.name === data.type);
      data.type = {
        name: data.type,
        icon: typeInfo ? typeInfo.icon : null
      };

      medications.push(data);
    });
    setMedList(medications);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(medList);
  return (
    <View style={styles.view1}>
      <Image
        source={require("./../assets/images/five.jpg")}
        style={styles.four}
      />
      <FlatList
        data={dateRange}
        horizontal={true}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item.FormateDate)}
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
          <MedicineCard />
        
    
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    marginTop: 18,
  },
  four: {
    width: "100%",
    height: 240,
    borderRadius: 25,
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
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
