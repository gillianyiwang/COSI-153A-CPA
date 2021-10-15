import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function TBN1Screen({ navigation }) {
  return (
    <View style={mainPageStyles.layout}>
      <Text style={{fontSize:25, justifyContent:'space-around', alignItems:'center' }}>
        TBN1 Screen
        {'\n'}{'\n'}
      </Text>
      <Button
        title='Go to TBN2'
        color='lightcoral'
        onPress={() => navigation.navigate('TBN2')}
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

export default TBN1Screen
