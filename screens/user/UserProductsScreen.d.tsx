import { StackNavigationProp } from '@react-navigation/stack'
import { CompositeNavigationProp } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import {
  AdminStackParamList,
  ShopDrawerParamList,
} from '../../navigation/paramList'

type UserProductsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AdminStackParamList, 'UserProductsScreen'>,
  DrawerNavigationProp<ShopDrawerParamList, 'Admin'>,
>

type Props = {
  navigation: UserProductsScreenNavigationProp,
}

export { Props }
