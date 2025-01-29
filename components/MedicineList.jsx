import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";

export default function MedicineList() {
  const [medList, setMedList] = useState();

  return (
    <View style={styles.view1}>
      <Image
        source={require("./../assets/images/five.jpg")}
        style={styles.four}
      />
      <Text>MedicineList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    marginTop: 18,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  four: { 
        width: '100%',
        height: 240,
        borderRadius: 25,
    },
});
