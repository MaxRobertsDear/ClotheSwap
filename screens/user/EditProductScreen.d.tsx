import { StackNavigationProp } from '@react-navigation/stack'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import {
  AdminStackParamList,
  ShopDrawerParamList,
} from '../../navigation/paramList'

type UserProductsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AdminStackParamList, 'EditProductsScreen'>,
  DrawerNavigationProp<ShopDrawerParamList, 'Shop'>,
>

type UserProductsScreenRouteProp = RouteProp<
  AdminStackParamList,
  'EditProductsScreen',
>

type Props = {
  navigation: UserProductsScreenNavigationProp,
  route: UserProductsScreenRouteProp,
}

export type { Props }
