import { View, Text, Button, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { Redirect } from 'expo-router'
import { useEffect } from 'react'
import { useState } from 'react'
import { auth } from '../../config/FirebaseConfig'
import { clearLocalStorage } from '../../services/Storage'
import Header from '../../components/Header'
import EmptyHome from '../../components/EmptyHome'
import MedicineList from '../../components/MedicineList'
import MedicineCard from '../../components/MedicineCard'
import AddMedForm from '../../components/AddMedForm'

export default function HomeScreen() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  return (
    <FlatList
    data={[]}
    ListHeaderComponent={
      <View style={{
        flex: 1,
        padding: 25,
        height: '100%',
        backgroundColor: 'orange',
      }}>
        <Header />
        {isMounted && <MedicineList />}
      </View>
    }/>
    
  );
}