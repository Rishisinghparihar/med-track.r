import React from 'react'
import AddNewMedHeader from './../../components/AddNewMedHeader'
import AddMedForm from './../../components/AddMedForm'
import { ScrollView } from 'react-native'
export default function index() {
  return (
    <ScrollView>
    <AddNewMedHeader/>
    <AddMedForm/>
    </ScrollView>
  )
}
