import {
  OrdersStackParamList,
  ShopDrawerParamList,
} from '../../navigation/paramList'
import { CompositeNavigationProp } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { StackNavigationProp } from '@react-navigation/stack'

type OrdersScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<OrdersStackParamList, 'OrdersScreen'>,
  DrawerNavigationProp<ShopDrawerParamList, 'Orders'>,
>

type Props = {
  navigation: OrdersScreenNavigationProp,
}

export { Props }
