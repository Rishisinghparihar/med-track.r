import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./../FirebaseConfig"; // Firestore config ko sahi path se import karna

const MedicationDetails = () => {
  const [medId, setMedId] = useState(""); // User input store karne ke liye
  const [medication, setMedication] = useState(null); // Firestore se data store karne ke liye
  const [loading, setLoading] = useState(false); // Loading indicator ke liye

  const fetchMedication = async () => {
    if (!medId) {
      alert("Please enter a medication ID!");
      return;
    }

    setLoading(true);

    try {
      const docRef = doc(db, "medications", medId); // Firestore document reference
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMedication(docSnap.data());
      } else {
        alert("No such document found!");
        setMedication(null);
      }
    } catch (error) {
      console.error("Error fetching medication:", error);
      alert("Error fetching medication. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Enter Medication ID:</Text>

      <TextInput
        placeholder="Enter Medication ID"
        value={medId}
        onChangeText={setMedId}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
          fontSize: 18,
        }}
      />

      <Button title="Fetch Medication" onPress={fetchMedication} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}

      {medication && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Medication Details:</Text>
          <Text>Name: {medication.name}</Text>
          <Text>Dosage: {medication.dosage}</Text>
        </View>
      )}
    </View>
  );
};

export default MedicationDetails;
