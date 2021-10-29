import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './WelcomeScreen'
import AboutScreen from './AboutScreen'
import FinaceScreen from './FinaceScreen'
import TBN2Screen from './TBN2Screen'


const Tab = createBottomTabNavigator();
const WelcomeStack = createNativeStackNavigator();
const StartStack = createNativeStackNavigator();


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
            <StartStack.Navigator>
              <StartStack.Screen name='Finace' component={FinaceScreen} />
              <StartStack.Screen name='TBN2' component={TBN2Screen} />
            </StartStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
