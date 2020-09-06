import React, { useLayoutEffect } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  Button,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { SharedElement } from 'react-navigation-shared-element'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import { RootState } from '../ProductsRootState.d'
import { Props } from './ProductDetailsScreen.d'

const ProductDetailScreen = ({ navigation, route }: Props) => {
  const productId = route.params.productId
  const selectedProduct = useSelector((state: RootState) =>
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
      <SharedElement id={`item.${productId}.photo`}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: selectedProduct && selectedProduct.imageUrl }}
          />
        </View>
      </SharedElement>
      <View style={styles.action}>
        <Button
          color={Colors.primary}
          title='Add to Cart'
          onPress={() => {
            if (selectedProduct) {
              dispatch(cartActions.addToCart(selectedProduct))
            } else {
              return
            }
          }}
        />
      </View>
      <Text style={styles.price}>
        £{selectedProduct && selectedProduct.price.toFixed(2)}
      </Text>
      <Text style={styles.description}>
        {selectedProduct && selectedProduct.description}
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: Platform.OS === 'web' ? 400 : '100%',
    height: Platform.OS === 'web' ? 400 : Dimensions.get('window').width,
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
