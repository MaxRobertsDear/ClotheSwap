import React, { useState, createContext } from 'react'
import { Text, View, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  createStore,
  combineReducers,
  Middleware,
  applyMiddleware,
} from 'redux'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/order'
import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from './screens/shop/ProductDetailScreen'
import Colors from './constants/Colors'
import CartScreen from './screens/shop/CartScreen'
import OrdersScreen from './screens/shop/OrdersScreen'
import UserProductsScreen from './screens/user/UserProductsScreen'
import EditProductsScreen from './screens/user/EditProductScreen'
import AuthScreen from './screens/user/AuthScreen'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

  const Home = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='ProductsOverview'
          component={ProductsOverviewScreen}
          options={{
            title: 'Products Overview',
            headerStyle: {
              backgroundColor:
                Platform.OS === 'android' ? Colors.primary : 'white',
            },
            headerTitleStyle: {
              color: Platform.OS === 'android' ? 'whitea' : Colors.primary,
            },
          }}
        />
        <Stack.Screen
          name='ProductDetails'
          component={ProductDetailScreen}
          options={{
            title: 'Product Details',
          }}
        />
        <Stack.Screen
          name='CartScreen'
          component={CartScreen}
          options={{
            title: 'Cart',
          }}
        />
      </Stack.Navigator>
    )
  }

  const Admin = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='UserProductsScreen'
          component={UserProductsScreen}
          options={{
            title: 'Your Products',
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
          name='EditProductsScreen'
          component={EditProductsScreen}
          options={{
            title: 'Edit Your Products',
            headerStyle: {
              backgroundColor:
                Platform.OS === 'android' ? Colors.primary : 'white',
            },
            headerTitleStyle: {
              color: Platform.OS === 'android' ? 'white' : Colors.primary,
            },
          }}
        />
      </Stack.Navigator>
    )
  }

  const Orders = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='OrdersScreen'
          component={OrdersScreen}
          options={{
            title: 'Orders',
            headerStyle: {
              backgroundColor:
                Platform.OS === 'android' ? Colors.primary : 'white',
            },
            headerTitleStyle: {
              color: Platform.OS === 'android' ? 'whitea' : Colors.primary,
            },
          }}
        />
      </Stack.Navigator>
    )
  }

  let screenStack
  console.log('-------------------------------------', isLoggedIn)
  if (isLoggedIn) {
    screenStack = (
      <Drawer.Navigator initialRouteName='Home' drawerType='slide'>
        <Drawer.Screen name='Home' component={Home} />
        <Drawer.Screen name='Orders' component={Orders} />
        <Drawer.Screen name='Admin' component={Admin} />
      </Drawer.Navigator>
    )
  } else {
    screenStack = (
      <Stack.Navigator>
        <Stack.Screen
          name='AuthScreen'
          component={AuthScreen}
          initialParams={isLoggedIn}
          options={{
            title: 'Auth Screen',
            headerStyle: {
              backgroundColor:
                Platform.OS === 'android' ? Colors.primary : 'white',
            },
            headerTitleStyle: {
              color: Platform.OS === 'android' ? 'whitea' : Colors.primary,
            },
          }}
        />
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{screenStack}</NavigationContainer>
    </Provider>
  )
}
