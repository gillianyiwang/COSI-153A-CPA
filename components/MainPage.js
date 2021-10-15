import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './WelcomeScreen'
import AboutScreen from './AboutScreen'
import TBN1Screen from './TBN1Screen'
import TBN2Screen from './TBN2Screen'


const Tab = createBottomTabNavigator();
const WelcomeStack = createNativeStackNavigator();
const TBN1Stack = createNativeStackNavigator();


export default function MainPage() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: 'lightcoral', tabBarInactiveTintColor: 'mistyrose' }}>
        <Tab.Screen name={'MAIN'}>
          {() => (
            <WelcomeStack.Navigator>
              <WelcomeStack.Screen
                name='Welcome!'
                component={WelcomeScreen}
              />
              <WelcomeStack.Screen name='About' component={AboutScreen} />
            </WelcomeStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name={'START'}>
          {() => (
            <TBN1Stack.Navigator>
              <TBN1Stack.Screen name='TBN1' component={TBN1Screen} />
              <TBN1Stack.Screen name='TBN2' component={TBN2Screen} />
            </TBN1Stack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
