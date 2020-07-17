import React, { useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import Colors from '../../constants/Colors'
import CartItem from './CartItem'
import Card from '../UI/Card'
import CartItemModel from '../../models/cart-item'

interface iOrderItem {
  amount: number;
  date: string;
  items: any;
}

const OrderItem = ({ amount, date, items }: iOrderItem) => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.viewDetails}>
          {items.map((cartItem: CartItemModel) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans-regular',
    fontSize: 16,
    color: '#888',
  },
  viewDetails: {
    width: '100%',
  },
})

export default OrderItem
