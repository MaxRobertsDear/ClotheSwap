import React, { useLayoutEffect, useCallback, useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  View,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'
import Product from '../../models/product'
import { RootState } from './index.d'
import {
  HomeStackParamList,
  ShopDrawerParamList,
} from '../../navigation/ShopNavigator'

import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp } from '@react-navigation/native'

type ProductsOverviewScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList>,
  DrawerNavigationProp<ShopDrawerParamList, 'Home'>,
>

type Props = {
  navigation: ProductsOverviewScreenNavigationProp,
}

const ProductsOverviewScreen = ({ navigation }: Props) => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts,
  )
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError]: any = useState()

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true)

    setError(null)
    try {
      await dispatch(productsActions.fetchProducts())
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch, setError])

  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, loadProducts])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomHeaderButton
          iconName='shopping-cart'
          onPress={() => {
            navigation.navigate('CartScreen')
          }}
        />
      ),
    })
  }, [navigation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomHeaderButton
          iconName='navicon'
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
    })
  }, [navigation])

  const selectItemHandler = (id: string, title: string) => {
    navigation.navigate('ProductDetails', {
      productId: id,
      productTitle: title,
    })
  }

  const addToCartHandler = (item: Product) => {
    dispatch(cartActions.addToCart(item))
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred.</Text>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Products not found. Maybe start adding some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: 'center',
      }}
      initialNumToRender={6}
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      numColumns={2}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
        >
          <Button
            color={Colors.primary}
            title='View Details'
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title)
            }}
          />
          <Button
            color={Colors.primary}
            title='Add to Cart'
            onPress={() => {
              addToCartHandler(itemData.item)
            }}
          />
        </ProductItem>
      )}
    />
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProductsOverviewScreen
