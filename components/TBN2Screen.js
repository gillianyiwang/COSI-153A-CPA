import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function TBN2Screen({ navigation }) {
  return (
    <View style={styles.layout}>
      <Text style={{fontSize:25, justifyContent:'space-around', alignItems:'center' }}>
        TBN2 Screen (coming soon!)
        {'\n'}{'\n'}
      </Text>
      <Button
        title='Go to Shopping List'
        color='lightcoral'
        onPress={() => navigation.navigate('Shopping List')}
      />
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

export default TBN2Screen
