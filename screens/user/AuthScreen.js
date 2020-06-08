import React from 'react'
import {
  ScrollView,
  Button,
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native'

import Colors from '../../constants/Colors'
import Input from '../../components/UI/Input'
import { DrawerContentScrollView } from '@react-navigation/drawer'

const AuthScreen = (props) => {
  console.log('AuthScreen props ', props.navigation.setParams)
  return (
    <View>
      <Text>Auth Screen </Text>
      <Button
        title='Login'
        color={Colors.primary}
        onPress={() => props.setUserIsLoggedIn(true)}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default AuthScreen
