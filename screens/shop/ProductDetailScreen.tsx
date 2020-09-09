import React, { useLayoutEffect, useCallback, useState, useEffect } from 'react'
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

import * as favouriteActions from '../../store/actions/favourites'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import { RootState } from '../ProductsRootState.d'
import { Props } from './ProductDetailsScreen.d'

const ProductDetailScreen = ({ navigation, route }: Props) => {
  const productId = route.params.productId
  const selectedProduct = useSelector((state: RootState) =>
    state.products.availableProducts.find((prod) => prod.id === productId),
  )
  const favIds = useSelector((state: any) => state.favourites.favIds)
  const [favourited, setFavourited] = useState(false)
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.productTitle,
    })
  }, [navigation, route.params.productTitle])

  useEffect(() => {
    if (favIds && productId && favIds.includes(productId)) {
      setFavourited(true)
    }
  }, [favIds, productId])

  const submitHandler = useCallback(async (favAction, prodId, ownerId, title, imageUrl, description, price) => {
    try {
      if (favAction === 'favourite') {
        await dispatch(
          favouriteActions.favouriteProduct(
            prodId,
            ownerId,
            title,
            imageUrl,
            description,
            price
          ),
        )
      } else if (favAction === 'unfavourite') {
        await dispatch(
          favouriteActions.unfavouriteProduct(
            prodId,
          ),
        )
      }

    } catch (err) {
      console.log(err.message)
    }
    navigation.goBack()
  }, [dispatch, navigation])

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
        <Button
          color={Colors.primary}
          title='❤️'
          onPress={() => {
            if (selectedProduct && !favourited) {
              submitHandler(
                'favourite',
                productId,
                selectedProduct.ownerId,
                selectedProduct.title,
                selectedProduct.imageUrl,
                selectedProduct.description,
                selectedProduct.price
              )
            } else if (selectedProduct && favourited) {
              submitHandler(
                'unfavourite',
                productId,
                selectedProduct.ownerId,
                selectedProduct.title,
                selectedProduct.imageUrl,
                selectedProduct.description,
                selectedProduct.price
              )
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
