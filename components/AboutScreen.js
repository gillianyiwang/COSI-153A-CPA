import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function AboutScreen({ navigation }) {
  return (
    <View style={mainPageStyles.layout}>
      <Text style={{fontSize:25, justifyContent:'space-around', alignItems:'center' }}>
        What's WhatIBought?
        {'\n'}
      </Text>
      <Text style={{fontSize:15, justifyContent:'space-around', alignItems:'center' }}>
        {'\n'}
        WhatIBought is an simple tool to record your shopping list.
        {'\n'}
      </Text>
      <Button
        title='Back to Welcome'
        color='lightcoral'
        onPress={() => navigation.navigate('Welcome!')}
      />
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

export default AboutScreen
