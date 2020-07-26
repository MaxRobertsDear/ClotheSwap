import React from 'react'
import { Platform, Button, View, SafeAreaView } from 'react-native'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import Colors from '../constants/Colors'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductsScreen from '../screens/user/EditProductScreen'
import * as authActions from '../store/actions/auth'
import {
  HomeStackParamList,
  AdminStackParamList,
  OrdersStackParamList,
  ShopTabParamList,
  ShopDrawerParamList,
} from './paramList'

const HomeStack = createStackNavigator<HomeStackParamList>()

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={{
          title: 'Products Overview',
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
      <HomeStack.Screen
        name='ProductDetails'
        component={ProductDetailScreen}
        options={{
          title: 'Product Details',
          headerStyle: {
            backgroundColor:
              Platform.OS === 'android' ? Colors.primary : 'white',
          },
          headerTitleStyle: {
            alignSelf: 'center',
            color: Platform.OS === 'android' ? 'white' : Colors.primary,
          },
        }}
      />
      <HomeStack.Screen
        name='CartScreen'
        component={CartScreen}
        options={{
          title: 'Cart',
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
    </HomeStack.Navigator>
  )
}

const AdminStack = createStackNavigator<AdminStackParamList>()

const Admin = () => {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
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
            alignSelf: 'center',
          },
        }}
      />
      <AdminStack.Screen
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
            alignSelf: 'center',
          },
        }}
      />
    </AdminStack.Navigator>
  )
}

const OrdersStack = createStackNavigator<OrdersStackParamList>()

const Orders = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name='OrdersScreen'
        component={OrdersScreen}
        options={{
          title: 'Orders',
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
    </OrdersStack.Navigator>
  )
}
const ShopTab = createBottomTabNavigator<ShopTabParamList>()
const ShopTabNavigator = () => {
  return (
    <ShopTab.Navigator>
      <ShopTab.Screen name='Home' component={Home} />
      <ShopTab.Screen name='Orders' component={Orders} />
      <ShopTab.Screen name='Admin' component={Admin} />
    </ShopTab.Navigator>
  )
}

const ShopDrawer = createDrawerNavigator<ShopDrawerParamList>()

const ShopNavigator = () => {
  const dispatch = useDispatch()
  return (
    <ShopDrawer.Navigator
      initialRouteName='Shop'
      drawerType='slide'
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            {/* @ts-ignore */}
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title='Logout'
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout())
                }}
              />
            </SafeAreaView>
          </View>
        )
      }}
    >
      <ShopDrawer.Screen name='Shop' component={ShopTabNavigator} />
    </ShopDrawer.Navigator>
  )
}

export default ShopNavigator
