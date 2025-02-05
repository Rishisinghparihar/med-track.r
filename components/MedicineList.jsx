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
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import MedicineCard from "./MedicineCard";
import { getLocalStorage } from "../services/Storage";
import { db } from "../config/FirebaseConfig";
import AddMedForm from "./AddMedForm";
import { typeList } from "../constant/options";
import EmptyHome from "./EmptyHome";


export default function MedicineList() {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD/MM/YYYY")
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetDateRangeList();
    GetMedicationList(selectedDate);
  }, [selectedDate]);
  const GetDateRangeList = () => {
    const dateRange = getDateRangeToDisplay();
    console.log(dateRange);
    setDateRange(dateRange);
  };
  const GetMedicationList = async (selectedDate) => {
    setLoading(true);
    const user = await getLocalStorage("userDetail");
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
            onPress={() => {
              setSelectedDate(item.FormateDate);
              GetMedicationList(item.FormateDate);
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
      {medList?.length>0? <FlatList
        data={medList}
        onRefresh={()=>GetMedicationList(selectedDate)}
        refreshing={loading}
        renderItem={({ item }) => 
        <TouchableOpacity>
        <MedicineCard medicine={item} />
        </TouchableOpacity>
        }
        keyExtractor={(item, index) => index.toString()}
      /> : <EmptyHome/>}
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
