import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector, RootStateOrAny } from 'react-redux'

import AuthNavigator from './AuthNavigator'
import ShopNavigator from './ShopNavigator'
import StartScreen from '../screens/StartScreen'

const AppNavigator = () => {
  const isAuth = useSelector((state: RootStateOrAny) => !!state.auth.token)
  const didTryAutoLogin = useSelector(
    (state: RootStateOrAny) => state.auth.didTryAutoLogin,
  )
  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartScreen />}
    </NavigationContainer>
  )
}

export default AppNavigator
