import React, { ReactNode } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Dimensions,
  Text,
} from 'react-native'

import Card from '../UI/Card'
import { numberOfItemColumns } from '../../constants/Constants'
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler'

interface iProductItem {
  image: string;
  title: string;
  price: number;
  onClick: () => void;
}

interface iTouchable {
  children: ReactNode;
  onPress: () => void;
}

const TouchableFeedback = ({ children, onPress }: iTouchable) => {
  if (Platform.OS === 'ios' || Platform.OS === 'web') {
    return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  } else if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        {children}
      </TouchableNativeFeedback>
    )
  }
}

const ProductItem = ({ image, title, price, onClick }: iProductItem) => {
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableFeedback onPress={onClick}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.price}>£{price.toFixed(2)}</Text>
          </View>
        </TouchableFeedback>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  product: {
    display: 'flex',
    width: Dimensions.get('window').width / numberOfItemColumns - 30,
    margin: 15,
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  imageContainer: {
    width:
      Platform.OS === 'web'
        ? Dimensions.get('window').width / numberOfItemColumns - 20
        : Dimensions.get('window').width / numberOfItemColumns - 5,
    height: Dimensions.get('window').width / numberOfItemColumns - 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  details: {
    display: 'flex',
    width: Dimensions.get('window').width / numberOfItemColumns - 5,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 14,
    marginVertical: 2,
  },
  price: {
    fontFamily: 'open-sans-regular',
    fontSize: 14,
    color: '#888',
  },
})

export default ProductItem
