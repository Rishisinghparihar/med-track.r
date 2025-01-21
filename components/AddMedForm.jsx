import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../constant/colors';
import { timing, typeList, whenTime } from '../constant/options';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
export default function AddMedForm() {
  const [formData, setFormData]=useState();

  const onHandleInputChange =(event, value)=>{
    setFormData(prev=>({ ...prev, [event]: value }));
  }
  // console.log(formData)
  return (
    <View
    style={{padding:25}}>
      <Text
      style={styles.header}>Add New Medicines</Text>
      <View  style={styles.inputGroup}>
      <AntDesign style={styles.icons} name="medicinebox" size={24} color="black" />
      <TextInput style={styles.textInput} placeholder='Medicine Name...'
      onChangeText={(value)=>onHandleInputChange('name', value)}/>
      </View>


      {/* typelist-options */}
      <FlatList
      horizontal layout 
      showsHorizontalScrollIndicator={false}
      style={{marginTop:10}}
      data={typeList}
      renderItem={({item, index}) =>( 
      <TouchableOpacity
         style={[styles.inputGroup,{marginRight:10},{backgroundColor:item.name==formData?.type?.name ? colors.PRIMARY:'white'}]}
         onPress={()=>onHandleInputChange('type', item)}
         >
        <Text style={[styles.text,{color:item.name==formData?.type?.name ? 'white': 'black'}]}>{item?.name}</Text>
        </TouchableOpacity>)}
      />


        {/* dosage */}
        <View style={[styles.inputGroup,{marginTop:13}]}>
        <MaterialIcons style={styles.icons} name="123" size={24} color="black" />
          {/* <AntDesign  name="clockcircleo" size={24} color='white'/> */}
          <TextInput style={styles.textInput} placeholder='Dosage ex. 2 tablets...'
          onChangeText={(value)=>onHandleInputChange('dosage', value)}/>
        </View>

        {/* timing */}
        <View style={[styles.inputGroup,{marginTop:13}]}>
          <MaterialIcons style={styles.icons} name="access-time" size={24} color="black" />
          <Picker
          selectedValue={formData?.whenTime}
          onValueChange={(itemValue) => onHandleInputChange('whenTime', itemValue)}
          style={{width:'90%'}}>
            {whenTime.map((item, index)=>(
              <Picker.Item label={item.name} value={item.name} key={index} />
            ))}
          </Picker>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
  header:{
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  inputGroup: {
    display:'flex',
    flexDirection:'row',
    padding: 10,
    // paddingTop:5,
    marginTop:6,
    alignItems: 'center',
    borderColor: colors.border_color,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor:'#FFFFFF',
    },
    textInput:{
      marginLeft:10,
      flex:1,
      fontSize:15
    },
    icons:{
      color:'red',
      borderRightWidth:1,
      borderRightColor:colors.border_color,
      padding:10,
    },
    text:{
      fontSize:15,
      // color:'#333',
      // padding:10
    },
    picker:{
      width:200,
      height:50,
      backgroundColor:'#FFFFFF',
      borderColor:colors.border_color,
      borderWidth:1,
      borderRadius:5,
      padding:10
    }
})

















// import React, { useState } from "react";

// const AddMedForm = () => {
//   const [formData, setFormData] = useState({
//     medicineType: "",
//     doses: "",
//     time: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     // You can add functionality here to save the form data, e.g., to Firebase
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
//       <h2>Medicine Tracker</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "15px" }}>
//           <label htmlFor="medicineType">Medicine Type:</label>
//           <select
//             id="medicineType"
//             name="medicineType"
//             value={formData.medicineType}
//             onChange={handleChange}
//             required
//             style={{ display: "block", width: "100%", padding: "8px" }}
//           >
//             <option value="">Select...</option>
//             <option value="capsule">Capsule</option>
//             <option value="tablet">Tablet</option>
//             <option value="injection">Injection</option>
//             <option value="syrup">Syrup</option>
//           </select>
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label htmlFor="doses">Number of Doses:</label>
//           <input
//             type="number"
//             id="doses"
//             name="doses"
//             value={formData.doses}
//             onChange={handleChange}
//             required
//             min="1"
//             style={{ display: "block", width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label htmlFor="time">Time:</label>
//           <input
//             type="time"
//             id="time"
//             name="time"
//             value={formData.time}
//             onChange={handleChange}
//             required
//             style={{ display: "block", width: "100%", padding: "8px" }}
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             padding: "10px 15px",
//             cursor: "pointer",
//             width: "100%",
//           }}
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMedForm;
