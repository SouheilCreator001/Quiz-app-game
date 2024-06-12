import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SigninScreen from '../screens/SigninScreen';
import TabNavigator from './TabNavigator';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthContext = React.createContext();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
        </Stack.Navigator>
    )
}

const MainStack = () => {
    return (
        <Stack.Navigator initialRouteName='ProfileScreen'>
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

const MainNavigator = () => {
    const {isLoggedIn} = useAuth();
  return (
    <>
        { isLoggedIn ? (
            <MainStack />
        ) : (
            <AuthStack />
            
        ) }
    </>
  )
}

export default MainNavigator