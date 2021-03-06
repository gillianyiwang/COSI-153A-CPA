import React , { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';


function ListScreen({ navigation }) {

const [dateTime,setDateTime] = useState('')
const [items,setItems] = useState('')
const [amount,setAmount] = useState('')
const [shoppingList,setShoppingList]= useState([])

useEffect(() => {getData()}
         ,[])

const getOriginalData = () => {

        AsyncStorage.getItem('@shoppingList')
          .then((jsonValue) => {
            let data = null
            if (jsonValue!=null) {
              data = JSON.parse(jsonValue)
              setShoppingList(data)
              console.log('just set Info, Name and Email')
            } else {
              console.log('just read a null value from Storage')

              setShoppingList([])
              setDateTime('')
              setItems('')
              setAmount('')
            }
          })
         .catch((error)=> {   console.log('error in getData ')})


}

const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@shoppingList')
        let data = null
        if (jsonValue!=null) {
          data = JSON.parse(jsonValue)
          setShoppingList(data)
          console.log('just set Info, Name and Email')
        } else {
          console.log('just read a null value from Storage')

          setShoppingList([])
          setDateTime('')
          setItems('')
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
        await AsyncStorage.setItem('@shoppingList', jsonValue)
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


const renderShoppingList = ({item}) => {
  return (
    <View style={styles.list}>
         <Text>{item.dateTime}</Text>
         <Text>{item.items} </Text>
         <Text>{item.amount} </Text>
    </View>
  )
}

  return (
    <View style={styles.layout}>
      <Text style={{fontSize:25, justifyContent:'space-around', alignItems:'center' }}>
        Personal Shopping List
        {'\n'}{'\n'}
      </Text>
      <Text style={{fontSize:15, justifyContent:'space-around', alignItems:'center' }}>
       Track your shopping history here...
       {'\n'}{'\n'}
      </Text>
      <Button
        title='Go to Income Tracker'
        color='lightcoral'
        onPress={() => navigation.navigate('Income Tracker')}
      />
      <View style={styles.container}>
   <Text style={{fontSize:15}}>
       Enter your shopping info below:
   </Text>

   <View style={{flexDirection:'row',
                 margin:10,
                 justifyContent:'space-around'}}>
         <TextInput
           style={{backgroundColor: 'mistyrose', fontSize:13}}
           placeholder='Date & Time'
           onChangeText={text => {
                setDateTime(text);
              }}
           value = {dateTime}
         />

         <TextInput
           style={{backgroundColor: 'mistyrose', fontSize:13}}
           placeholder='Items'
           onChangeText={text => {
                setItems(text);
              }}
           value = {items}
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
              const newshoppingList =
                shoppingList.concat(
                  {'dateTime':dateTime,
                   'items':items,
                   'amount':amount,
                   'completed':new Date()
                })
              setShoppingList(newshoppingList)
              storeData(newshoppingList)
              setDateTime('')
              setItems('')
              setAmount('')
            }}
            />
     <Button
             title={'Reset All'}
             color='lightcoral'
             onPress = {() => {
               clearAll()
               setShoppingList([])
             }}
             />

   </View>
   <View style={{flexDirection:'row',
                 justifyContent:'center',
                 backgroundColor:'lavenderblush'}}>
   </View>

   <FlatList
     data={shoppingList.reverse()}
     renderItem={renderShoppingList}
     keyExtractor={item => item.dateTime}
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

export default ListScreen
