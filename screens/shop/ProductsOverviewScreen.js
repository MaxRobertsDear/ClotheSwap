import React, { useLayoutEffect, useEffect, useState } from 'react'
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

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      try {
        await dispatch(productsActions.fetchProducts())
      } catch (err) {
        setError(err.message)
      }
      setIsLoading(false)
    }
    loadProducts()
  }, [dispatch])

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

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetails', {
      productId: id,
      productTitle: title,
    })
  }

  const addToCartHandler = (item) => {
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
      data={products}
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
