import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import {
  HomeStackParamList,
  ShopDrawerParamList,
} from '../../navigation/paramList'

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

export { Props }
