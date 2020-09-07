import React from 'react'
import { Button, View, SafeAreaView, Text } from 'react-native'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

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
  ProfileStackParamList,
  OrdersStackParamList,
  ShopTabParamList,
  ShopDrawerParamList,
} from './paramList'
import FavouriteProductsScreen from '../screens/shop/FavouriteProductsScreen'

// const HomeStack = createStackNavigator<HomeStackParamList>()
const HomeStack = createSharedElementStackNavigator<HomeStackParamList>()

export const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={{
          title: 'Products Overview',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          headerTintColor: Colors.primary,
        }}
      />
      <HomeStack.Screen
        name='ProductDetails'
        component={ProductDetailScreen}
        options={{
          title: 'Product Details',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          headerTintColor: Colors.primary,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress
              }
            }
          }
        }}
        sharedElementsConfig={(route) => {
          const { productId } = route.params;
          return [`item.${productId}.photo`];
        }}
      />
      <HomeStack.Screen
        name='CartScreen'
        component={CartScreen}
        options={{
          title: 'Cart',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          headerTintColor: Colors.primary,
        }}
      />
    </HomeStack.Navigator>
  )
}

const ProfileStack = createStackNavigator<ProfileStackParamList>()

const Profile = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name='UserProductsScreen'
        component={UserProductsScreen}
        options={{
          title: 'Your Products',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          headerTintColor: Colors.primary,
        }}
      />
      <ProfileStack.Screen
        name='EditProductsScreen'
        component={EditProductsScreen}
        options={{
          title: 'Edit Your Products',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          headerTintColor: Colors.primary,
        }}
      />
    </ProfileStack.Navigator>
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
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          headerTintColor: Colors.primary,
        }}
      />
    </OrdersStack.Navigator>
  )
}

const FavouritesStack = createSharedElementStackNavigator()

const Favourites = () => {
  return (
    <FavouritesStack.Navigator>
      <FavouritesStack.Screen
        name='FavouriteProducts'
        component={FavouriteProductsScreen}
        options={{
          title: 'Fav Products Overview',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          headerTintColor: Colors.primary,
        }}
      />
      <FavouritesStack.Screen
        name='FavProductDetails'
        component={ProductDetailScreen}
        options={{
          title: 'Fav Product Details',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleAlign: 'center',
          headerTintColor: Colors.primary,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress
              }
            }
          }
        }}
        sharedElementsConfig={(route) => {
          const { productId } = route.params;
          return [`item.${productId}.photo`];
        }}
      />
    </FavouritesStack.Navigator>
  )
}

const ShopTab = createBottomTabNavigator<ShopTabParamList>()
const ShopTabNavigator = () => {
  return (
    <ShopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = 'md-search'
          } else if (route.name === 'Favourites') {
            iconName = 'md-heart'
          } else if (route.name === 'Profile') {
            iconName = 'md-person'
          }
          return <Icon name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: 'gray',
        style: {
          marginBottom: 40,
          marginHorizontal: 100,
          paddingBottom: 20,
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: 'black',
          shadowOpacity: 0.27,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 5,
          position: 'absolute',
        },
      }}
    >
      <ShopTab.Screen name='Home' component={Home} />
      <ShopTab.Screen name='Favourites' component={Favourites} />
      <ShopTab.Screen name='Profile' component={Profile} />
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
      <ShopDrawer.Screen
        name='Shop'
        component={ShopTabNavigator}
        options={{
          drawerIcon: ({ focused, size }) => {
            let color
            if (focused) {
              color = Colors.primary
            } else {
              color = 'grey'
            }
            return <Icon name={'md-home'} size={size} color={color} />
          },
          drawerLabel: ({ focused }) => {
            let color
            if (focused) {
              color = Colors.primary
            } else {
              color = 'grey'
            }
            return <Text style={{ color: color }}>Home</Text>
          },
        }}
      />
      <ShopDrawer.Screen
        name='Orders'
        component={Orders}
        options={{
          drawerIcon: ({ focused, size }) => {
            let color
            if (focused) {
              color = Colors.primary
            } else {
              color = 'grey'
            }
            return <Icon name={'md-cart'} size={size} color={color} />
          },
          drawerLabel: ({ focused }) => {
            let color
            if (focused) {
              color = Colors.primary
            } else {
              color = 'grey'
            }
            return <Text style={{ color: color }}>Orders</Text>
          },
        }}
      />
    </ShopDrawer.Navigator>
  )
}

export default ShopNavigator
