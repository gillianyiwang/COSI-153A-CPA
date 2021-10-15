import React , { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';


function WelcomeScreen({ navigation }) {

    const [emails,setEmails]= useState([])

    useEffect(() => {getData()}
               ,[])

    const getData = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem('@emails')
            let data = null
            if (jsonValue!=null) {
              data = JSON.parse(jsonValue)
              setemails(data)
              console.log('set emails')
            } else {
              console.log('read a null value from storage')
              setemails([])
            }


            } catch(e) {
              console.log("error in viewing data ")
              console.dir(e)
            }
      }

      const storeData = async (value) => {
            try {
              const jsonValue = JSON.stringify(value)
              await AsyncStorage.setItem('@emails', jsonValue)
              console.log('just stored '+jsonValue)
            } catch (e) {
              console.log("error in storing data ")
              console.dir(e)
            }
      }

      const clearAll = async () => {
            try {
              console.log('clearing data')
              await AsyncStorage.clear()
            } catch(e) {
              console.log("error in clearing data ")
              console.dir(e)
              // clear error
            }
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
        Subscribe to the newsletters... ⇙
        {'\n'}
      </Text>
      <TextInput style={{fontSize:15,backgroundColor:'mistyrose', justifyContent:'space-around', alignItems:'center'}}
        placeholder='EMAIL ADDRESS'
        onChangeText={text => {
          setEmails(text);
        }}
        value = {emails}
      />
      <Button
        title='Submit'
        color='lightcoral'  ///this need to be fixed by calling an alert
        onPress = {() => {
               setEmails("")
             }}
      />
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
