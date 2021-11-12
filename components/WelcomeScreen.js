import React , { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';


function WelcomeScreen({ navigation }) {

  return (
    <View style={styles.layout}>
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


      <Text>
        {'\n'}{'\n'}{'\n'}
      </Text>
      <Text style={{color: 'lightcoral', backgroundColor: 'mistyrose'}}>
        {'\t'}{'\t'}GW・2021{'\t'}{'\t'}
      </Text>
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
  });

export default WelcomeScreen
