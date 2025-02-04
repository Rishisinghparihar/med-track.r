import { View, Text, Image } from 'react-native'
import React from 'react'

export default function MedicineCard({medicine}) {
  console.log({medicine})
  return (
    <View>
        <View>
            <Image 
            source={require('./../assets/icons/pill.png')}
            style={{width:50,height:50,opacity:0.5,}}/> 
            <Text>{medicine?.name}</Text>
            <Text>{medicine?.when}</Text>
            <Text>{medicine?.dose}{medicine?.type.name}</Text>
        </View>
    </View>
  )
}



// import { View, Text, Image, StyleSheet } from 'react-native';
// import React from 'react';

// export default function MedicineCard({ medicine }) {
//   return (
//     <View style={styles.card}>
//       {/* Medicine Icon */}
//       <Image 
//         source={{ uri: medicine?.type?icon || 'https://via.placeholder.com/100' :""}} 
//         style={styles.image} 
//       />

//       {/* Medicine Details */}
//       <View style={styles.details}>
//         <Text style={styles.name}>{medicine?.name || "Unknown Medicine"}</Text>
//         <Text style={styles.dosage}>{medicine?.dosage || "No Dosage Info"}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     padding: 10,
//     marginVertical: 8,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3, // For Android shadow
//   },
//   image: {
//     width: 60,
//     height: 60,
//     borderRadius: 10,
//     marginRight: 15,
//   },
//   details: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   dosage: {
//     fontSize: 14,
//     color: '#666',
//   },
// });
