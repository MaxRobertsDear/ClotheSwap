import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'

import AuthScreen from '../screens/user/AuthScreen'
import Colors from '../constants/Colors'

type StackParamList = {
  AuthScreen: undefined,
}

const Stack = createStackNavigator<StackParamList>()

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
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
            alignSelf: 'center',
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
