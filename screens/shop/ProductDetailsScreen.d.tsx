import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import {
  HomeStackParamList,
  ShopDrawerParamList,
} from '../../navigation/paramList'

type ProductDetailsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'ProductDetails'>,
  DrawerNavigationProp<ShopDrawerParamList, 'Shop'>,
>

type ProductDetailsScreenRouteProp = RouteProp<
  HomeStackParamList,
  'ProductDetails',
>

type Props = {
  navigation: ProductDetailsScreenNavigationProp,
  route: ProductDetailsScreenRouteProp,
}

export type { Props }
