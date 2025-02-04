import React from 'react'
import AddNewMedHeader from './../../components/AddNewMedHeader'
import AddMedForm from './../../components/AddMedForm'
import { ScrollView } from 'react-native'
import MedicineList from '../../components/MedicineList'
import MedicineCard from '../../components/MedicineCard'
export default function index() {
  return (
    <ScrollView>
    <AddNewMedHeader/>
    <AddMedForm/>

    {/* m kr rha hu y changes */}
             {/* <MedicineList/>
             <MedicineCard/> */}
    </ScrollView>
  )
}
