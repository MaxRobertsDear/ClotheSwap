import React, { ReactNode } from 'react'
import { StyleSheet, View, Image, Platform, Dimensions } from 'react-native'

import Card from '../UI/Card'
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler'

interface iProductItem {
  image: string;
  onClick: () => void;
}

interface iTouchable {
  children: ReactNode;
  onPress: () => void;
}

const TouchableFeedback = ({ children, onPress }: iTouchable) => {
  if (Platform.OS === 'ios') {
    return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  } else if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        {children}
      </TouchableNativeFeedback>
    )
  }
}

const ProductItem = ({ image, onClick }: iProductItem) => {
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableFeedback onPress={onClick}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
        </TouchableFeedback>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  product: {
    display: 'flex',
    margin: 2,
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  imageContainer: {
    width: Dimensions.get('screen').width / 3 - 5,
    height: Dimensions.get('screen').width / 3 - 5,
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
})

export default ProductItem
