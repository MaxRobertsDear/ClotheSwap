import React, { ReactNode } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  Dimensions,
} from 'react-native'

import Card from '../UI/Card'

interface iProductItem {
  image: string;
  title: string;
  price: number;
  children: ReactNode;
}

const ProductItem = ({ image, title, price, children }: iProductItem) => {
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>£{price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{children}</View>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  product: {
    height: 380,
    width: Dimensions.get('window').width / 2 - 15,
    margin: 5,
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: Platform.OS !== 'web' ? '100%' : 200,
    width: Platform.OS !== 'web' ? '100%' : 300,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginVertical: 2,
  },
  price: {
    fontFamily: 'open-sans-regular',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'space-around',
    height: '25%',
    width: Platform.OS === 'web' ? 300 : '75%',
  },
})

export default ProductItem
