import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import AuthNavigator from './AuthNavigator'
import ShopNavigator from './ShopNavigator'
import StartScreen from '../screens/StartScreen'

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token)
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin)
  console.log('isAuth ', isAuth)
  console.log('didTryAutoLogin ', didTryAutoLogin)
  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartScreen />}
    </NavigationContainer>
  )
}

export default AppNavigator
