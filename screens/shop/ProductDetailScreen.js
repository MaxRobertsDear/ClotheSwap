import React, { useLayoutEffect } from 'react'
import { Text, StyleSheet, View, Image, Button, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

const ProductDetailScreen = ({ navigation, route }) => {
  const productId = route.params.productId
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId),
  )
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.productTitle,
    })
  }, [navigation, route.params.productTitle])

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.action}>
        <Button
          color={Colors.primary}
          title='Add to Cart'
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct))
          }}
        />
      </View>
      <Text style={styles.price}>£{selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: '100%',
  },
  action: {
    alignItems: 'center',
    marginVertical: 10,
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontFamily: 'open-sans-regular',
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 20,
  },
})

export default ProductDetailScreen
