import React , { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';


function WelcomeScreen({ navigation }) {

    const STORAGE_KEY = '@save_names'
    const [names,setNames]= useState('')

    const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, names)
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const readData = async () => {
  try {
    const usernames = await AsyncStorage.getItem(STORAGE_KEY)

    if (usernames !== null) {
      setAge(usernames)
    }
  } catch (e) {
    alert('Failed to fetch the data from storage')
  }
}

useEffect(() => {
  readData()
}, [])

const clearStorage = async () => {
  try {
    await AsyncStorage.clear()
    alert('Storage successfully cleared!')
  } catch (e) {
    alert('Failed to clear the async storage.')
  }
}

const onChangeText = usernames => setAge(usernames)

const onSubmitEditing = () => {
  if (!names) return

  saveData(names)
  setNames('')
}

  return (
    <View style={mainPageStyles.layout}>
      <Text style={{fontSize:25, color: 'black', justifyContent:'space-around', alignItems:'center' }}>
        {'\n'}{'\n'}
        Hello!{'\n'}
        This is WhatIBought
        {'\n'}
      </Text>
      <Text style={{fontSize:15, justifyContent:'space-around', alignItems:'center' }}>
       {'\n'}
       Learn more about the WhatIBought... ⇙
       {'\n'}
      </Text>
      <Button
        title='About'
        color='lightcoral'
        onPress={() => navigation.navigate('About')}
      />
      <Text style={{fontSize:15, color: 'black', justifyContent:'space-around', alignItems:'center', backgroundColor:'lavenderblush'}}>
        {'\n'}{'\n'}
        Save your name... ⇙
        {'\n'}
      </Text>
      <TextInput style={{fontSize:15,backgroundColor:'mistyrose', justifyContent:'space-around', alignItems:'center'}}
        placeholder='YOUR NAME'
        onChangeText={text => {
          setNames(text);
        }}
        value = {names}
      />

      <Text>Hey {names}! Nice to meet you</Text>
      <TouchableOpacity onPress={clearStorage}>
        <Text style={{
          margin: 10, padding: 10, fontSize:15, color:'white', backgroundColor:'lightcoral'}}>
        Click to clear your name</Text>
      </TouchableOpacity>

      <Text>
        {'\n'}{'\n'}{'\n'}
      </Text>
      <Text style={{color: 'lightcoral', backgroundColor: 'mistyrose'}}>
        {'\t'}{'\t'}GW・2021{'\t'}{'\t'}
      </Text>
    </View>
  );
}

const mainPageStyles = StyleSheet.create({
  layout: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:'lavenderblush',
  },
  });

export default WelcomeScreen
