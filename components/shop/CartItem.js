import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Colors from '../../constants/Colors'

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>£{props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <Icon.Button
            // eslint-disable-next-line react/prop-types
            onPress={props.onRemove}
            name='trash'
            backgroundColor='white'
            color={Platform.OS === 'android' ? 'white' : Colors.primary}
            size={23}
            TouchableComponent
          ></Icon.Button>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans-regular',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
})

export default CartItem
