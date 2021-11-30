import React , { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TrackerScreen({ navigation }) {

  const [month,setMonth] = useState('')
  const [amount,setAmount] = useState('')
  const [incomeTracker,setIncomeTracker]= useState([])

  useEffect(() => {getData()}
           ,[])

  const getOriginalData = () => {

          AsyncStorage.getItem('@incomeTracker')
            .then((jsonValue) => {
              let data = null
              if (jsonValue!=null) {
                data = JSON.parse(jsonValue)
                setIncomeTracker(data)
                console.log('just set Info, Name and Email')
              } else {
                console.log('just read a null value from Storage')

                setIncomeTracker([])
                setMonth('')
                setAmount('')
              }
            })
           .catch((error)=> {   console.log('error in getData ')})


  }

  const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@incomeTracker')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setIncomeTracker(data)
            console.log('just set Info, Name and Email')
          } else {
            console.log('just read a null value from Storage')

            setIncomeTracker([])
            setMonth('')
            setAmount('')
          }
        } catch(e) {
          console.log('error in getData ')
          console.dir(e)
        }
  }

  const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@incomeTracker', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log('error in storeData ')
          console.dir(e)
        }
  }

  const clearOriginalData = () => {
        try {
          console.log('in clearData')
          AsyncStorage.clear()
             .then(() => {console.log('cleared the data')})
        } catch(e) {
          console.log('error in clearData ')
          console.dir(e)
        }
  }

  const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log('error in clearData ')
          console.dir(e)
        }
  }


  const renderincomeTracker = ({item}) => {
    return (
      <View style={styles.list}>
           <Text>{item.month}</Text>
           <Text>{item.amount} </Text>
      </View>
    )
  }

    return (
      <View style={styles.layout}>
        <Text style={{fontSize:25, justifyContent:'space-around', alignItems:'center' }}>
          Personal Income Tracker
          {'\n'}{'\n'}
        </Text>
        <Text style={{fontSize:15, justifyContent:'space-around', alignItems:'center' }}>
         Track your income on this page...
         {'\n'}{'\n'}
        </Text>
      <Button
        title='Go to Shopping List'
        color='lightcoral'
        onPress={() => navigation.navigate('Shopping List')}
      />
      <View style={styles.container}>
   <Text style={{fontSize:15}}>
       Enter your income below:
   </Text>

   <View style={{flexDirection:'row',
                 margin:10,
                 justifyContent:'space-around'}}>
         <TextInput
           style={{backgroundColor: 'mistyrose', fontSize:13}}
           placeholder='Month'
           onChangeText={text => {
                setMonth(text);
              }}
           value = {month}
         />

         <TextInput
           style={{backgroundColor: 'mistyrose', fontSize:13}}
           placeholder='Amount'
           onChangeText={text => {
                setAmount(text);
              }}
           value = {amount}
         />
     </View>
     <View style={{flexDirection:'row',
                   justifyContent:'space-around'}}>
     <Button
            title={'Enter'}
            color='lightcoral'
            onPress = {() => {
              const newincomeTracker =
                incomeTracker.concat(
                  {'month':month,
                   'amount':amount,
                   'completed':new Date()
                })
              setIncomeTracker(newincomeTracker)
              storeData(newincomeTracker)
              setMonth('')
              setAmount('')
            }}
            />
     <Button
             title={'Reset all'}
             color='lightcoral'
             onPress = {() => {
               clearAll()
               setIncomeTracker([])
             }}
             />

   </View>
   <View style={{flexDirection:'row',
                 justifyContent:'center',
                 backgroundColor:'lavenderblush'}}>

   </View>

   <FlatList
     data={incomeTracker.reverse()}
     renderItem={renderincomeTracker}
     keyExtractor={item => item.month}
   />


  </View>
    </View>
  );
  }


  const styles = StyleSheet.create({
  layout: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:'lavenderblush',
  },
  container: {
  flex: 1,
  flexDirection:'column',
  backgroundColor: 'lavenderblush',
  justifyContent: 'center',
  textAlign:'left',
  marginTop:20,
  padding:20,
  },
  list:{
  flexDirection:'row',
  justifyContent:'space-between',
  },
  debugging: {
  textAlign:'center',
  backgroundColor:'lavenderblush',
  fontSize: 15,
  padding:10,
  color: 'black'
  },

  });

export default TrackerScreen
