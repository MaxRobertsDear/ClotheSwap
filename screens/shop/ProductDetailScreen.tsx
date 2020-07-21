import React, { useLayoutEffect } from 'react'
import { Text, StyleSheet, View, Image, Button, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import { RootState } from './index.d'
import {
  HomeStackParamList,
  ShopDrawerParamList,
} from '../../navigation/ShopNavigator'

type ProductDetailsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'ProductDetails'>,
  DrawerNavigationProp<ShopDrawerParamList>,
>

type ProductDetailsScreenRouteProp = RouteProp<
  HomeStackParamList,
  'ProductDetails',
>

type Props = {
  navigation: ProductDetailsScreenNavigationProp,
  route: ProductDetailsScreenRouteProp,
}

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
      <Image
        style={styles.image}
        source={{ uri: selectedProduct && selectedProduct.imageUrl }}
      />
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
