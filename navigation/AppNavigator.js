import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import AuthNavigator from './AuthNavigator'
import ShopNavigator from './ShopNavigator'

const AppNavigator = () => {
  const userId = useSelector((state) => state.auth.userId)
  return (
    <NavigationContainer>
      {userId ? <ShopNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default AppNavigator
