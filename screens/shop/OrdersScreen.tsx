import React, { useLayoutEffect, useEffect, useState } from 'react'
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersActions from '../../store/actions/orders'
import Colors from '../../constants/Colors'
import { RootState } from '../../App'
import { Props } from './OrdersScreen.d'

const OrdersScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomHeaderButton
          iconName='md-menu'
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
    })
  }, [navigation])

  const orders = useSelector((state: RootState) => state.orders.orders)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // @ts-ignore
    dispatch(ordersActions.fetchOrders()).then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={styles.laodingSpinner}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (!orders.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found. Maybe you should order some.</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      contentContainerStyle={{
        backgroundColor: 'white',
        height: '100%',
      }}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  laodingSpinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default OrdersScreen
