import React, { useState } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk'
import * as firebase from 'firebase'

import { firebaseConfig } from './api-config'
// @ts-ignore
import productsReducer from './store/reducers/products'
// @ts-ignore
import cartReducer from './store/reducers/cart'
// @ts-ignore
import ordersReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'
// @ts-ignore

import AppNavigator from './navigation/AppNavigator'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

firebase.initializeApp(firebaseConfig)

export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true)
        }}
      />
    )
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}
