import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity, Alert,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { getLocalStorage } from '../services/Storage';
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../constant/colors";
import { timing, typeList, whenTime } from "../constant/options";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { FormateDate, FormateDateForText, FormateTime, getDatesRange } from "../services/TimeFormat";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { useRouter } from "expo-router";

export default function AddMedForm() {
  const [formData, setFormData] = useState();
  const [showstartdate, setShowStartDate] = useState(false);
  const [showenddate, setShowEndDate] = useState(false);
  const [showstarttime, setShowStartTime] = useState(false);
  const [loading, setLoading] = useState(false);
  const router= useRouter();

  const SaveMedication=async()=>{
    const docId=Date.now().toString();
    const user=await getLocalStorage('userDetail');
    if(!(formData?.name || formData?.type || formData?.dosage || formData?.whenTime || formData?.StartDate || formData?.endDate || formData?.reminder)){
      Alert.alert('All fields are required');
      return;
    }
    const dates= getDatesRange(formData?.StartDate,formData?.endDate);
    setLoading(true);
    try {
      await setDoc(doc(db,'medication', docId),{
        ...formData,
        userEmail:user?.email,
        docId:docId,
        dates:dates,
      });
      console.log('Medication Added');
      setLoading(false);
      Alert.alert('Great...!','successfully Added',[
        {
          text:'ok',
          onPress:()=>{
            router.push('(tabs)')
            }
        }
      ]);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const onHandleInputChange = (event, value) => {
    setFormData((prev) => ({ ...prev, [event]: value }));
  };
  // console.log(formData)
  return (
        
        <View style={{ padding: 26 }}>
      <Text style={styles.header}>Add New Medicines</Text>
      <View style={styles.inputGroup}>
        <AntDesign
          style={styles.icons}
          name="medicinebox"
          size={24}
          color="red"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Medicine Name..."
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>

      {/* typelist-options */}
      <FlatList
        horizontal
        layout
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
        data={typeList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name == formData?.type?.name ? colors.PRIMARY : "white",
              },
            ]}
            onPress={() => onHandleInputChange("type", item)}
          >
            <Text
              style={[
                styles.text,
                {
                  color: item.name == formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* dosage */}
      <View style={[styles.inputGroup, { marginTop: 13 }]}>
        <MaterialIcons
          style={styles.icons}
          name="123"
          size={24}
          color="orange"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dosage ex. 2 tablets..."
          onChangeText={(value) => onHandleInputChange("dosage", value)}
        />
      </View>

      {/* timing */}
      <View style={[styles.inputGroup, { marginTop: 13 }]}>
        <MaterialIcons
          style={styles.icons}
          name="access-time"
          size={24}
          color="black"
        />
        <Picker
          selectedValue={formData?.whenTime}
          onValueChange={(itemValue) =>
            onHandleInputChange("whenTime", itemValue)
          }
          style={{ width: "90%" }}
        >
          {whenTime.map((item, index) => (
            <Picker.Item label={item.name} value={item.name} key={index} />
          ))}
        </Picker>
      </View>

      {/* from to from  */}
      <View style={styles.date}>
        <TouchableOpacity
          onPress={() => setShowStartDate(true)}
          style={[styles.inputGroup, { marginTop: 13, flex: 1 }]}
        >
          <MaterialIcons
            style={styles.icons}
            name="calendar-month"
            size={18}
            color="black"
          />
          <Text style={[styles.textInput, { flex: 1 }]}>
            {FormateDateForText(formData?.StartDate) ?? "Start Date"}
          </Text>
        </TouchableOpacity>
        {showstartdate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "StartDate",
                FormateDate(event.nativeEvent.timestamp)
              );
              setShowStartDate(false);
            }}
            value={new Date(formData?.StartDate) ?? new Date()}
          />
        )}
        <TouchableOpacity
          onPress={() => setShowEndDate(true)}
          style={[styles.inputGroup, { marginTop: 13, flex: 1 }]}
        >
          <MaterialIcons
            style={styles.icons}
            name="calendar-month"
            size={18}
            color="black"
          />
          <Text style={[styles.textInput]}>
            {FormateDateForText(formData?.endDate) ?? "End Date"}
          </Text>
        </TouchableOpacity>
        {showenddate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "endDate",
                FormateDate(event.nativeEvent.timestamp)
              );
              setShowEndDate(false);
            }}
            value={new Date(formData?.endDate) ?? new Date()}
          />
        )}
      </View>
      <View style={styles.date}>
        <TouchableOpacity
          onPress={() => setShowStartTime(true)}
          style={[styles.inputGroup, { marginTop: 13, flex: 1 }]}
        >
         <MaterialCommunityIcons name="reminder" size={24} color="black" />
          <Text style={[styles.textInput, { flex: 1 }]}>
            {formData?.reminder??'remind me'}
          </Text>
        </TouchableOpacity>
        </View>
        {showstarttime && <RNDateTimePicker
        mode="time"
        onChange={(event)=>
        {
          onHandleInputChange('reminder',FormateTime(event.nativeEvent.timestamp));
          setShowStartTime(false);
        }
        }
        value={new Date(formData?.StartTime) ?? new Date()}
        />}
        <TouchableOpacity style={styles?.button} onPress={SaveMedication}>
          { loading? <ActivityIndicator 
          color={'white'}
          size={'small'}
          />:
          <Text style={styles?.buttonTxt}>save</Text>}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    // paddingTop:5,
    marginTop: 6,
    alignItems: "center",
    borderColor: colors.border_color,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  textInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
  },
  icons: {
    // color: "red",
    borderRightWidth: 0.5,
    borderRightColor: colors.border_color,
    padding: 10,
  },
  text: {
    fontSize: 15,
    // color:'#333',
    // padding:10
  },
  picker: {
    width: 200,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderColor: colors.border_color,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  date: {
    display: "flex",
    flexDirection: "row",
    // justifyContent:"space-between",
    marginTop: 13,
    gap: 20,
  },
  button:{
    padding:8,
    marginTop:30,
    backgroundColor:'black',
    borderRadius:23,
    width:'100%'
},
  buttonTxt:{
    color:'white',
    textAlign:'center',
    padding:15,
    fontSize:17,
    fontWeight:'bold',
  }
});
