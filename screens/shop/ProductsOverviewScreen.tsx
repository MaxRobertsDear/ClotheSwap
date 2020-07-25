import React, { useLayoutEffect, useCallback, useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'
import { RootState } from '../ProductsRootState.d'
import { Props } from './ProductsOverviewScreen.d'

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
      numColumns={3}
      showsVerticalScrollIndicator={false}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          onClick={() => {
            selectItemHandler(itemData.item.id, itemData.item.title)
          }}
        />
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
