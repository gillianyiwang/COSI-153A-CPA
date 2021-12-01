import React , { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TrackerScreen({ navigation }) {

  const [hours, setHours] = useState(0);
  const [hourlyWage, setHourlyWage] = useState(0);
  const [totalWage, setTotalWage] = useState(0);


  const [month,setMonth] = useState('')
  const [income,setIncome] = useState('')
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
                setIncome('')
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
            setIncome('')
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
           <Text>{item.income} </Text>
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
         Track your income here...
         {'\n'}{'\n'}
        </Text>
      <Button
        title='Back to Shopping List'
        color='lightcoral'
        onPress={() => navigation.navigate('Shopping List')}
      />

      <View>
  <Text style={{fontSize:15, justifyContent:'space-around', alignItems:'center' }}>
     {'\n'}{'\n'}
    Want to convert your hourly wage to monthly wage?  ⇙
  </Text>
  <TextInput
        style={{backgroundColor: 'mistyrose', fontSize:13}}
        placeholder='Hourly Wage'
        onChangeText={text => {setHourlyWage(parseFloat(text))}}
    />
  <TextInput
        style={{backgroundColor: 'mistyrose', fontSize:13}}
        placeholder='Total Working Hours Per Month'
        onChangeText={text => {setHours(parseFloat(text))}}
    />
  <Button
        title={'Calculate'}
        color='lightcoral'
        onPress = {() =>
             setTotalWage(hours * hourlyWage)}
    />
  <Text> Your monthly wage is ${totalWage}!</Text>
</View>

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
           placeholder='Income'
           onChangeText={text => {
                setIncome(text);
              }}
           value = {income}
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
                   'income':income,
                   'completed':new Date()
                })
              setIncomeTracker(newincomeTracker)
              storeData(newincomeTracker)
              setMonth('')
              setIncome('')
            }}
            />
     <Button
             title={'Reset All'}
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
