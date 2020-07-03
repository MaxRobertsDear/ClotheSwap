import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'

import AboutScreen from '../screens/AboutScreen'
import AuthScreen from '../screens/user/AuthScreen'
import Colors from '../constants/Colors'

const Stack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator mode='modal'>
      <Stack.Screen
        name='AboutScreen'
        component={AboutScreen}
        options={{
          title: 'About us',
          headerStyle: {
            backgroundColor:
              Platform.OS === 'android' ? Colors.primary : 'white',
          },
          headerTitleStyle: {
            color: Platform.OS === 'android' ? 'white' : Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name='AuthScreen'
        component={AuthScreen}
        options={{
          title: 'Auth Screen',
          headerStyle: {
            backgroundColor:
              Platform.OS === 'android' ? Colors.primary : 'white',
          },
          headerTitleStyle: {
            color: Platform.OS === 'android' ? 'white' : Colors.primary,
          },
          headerLeft: () => {},
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
