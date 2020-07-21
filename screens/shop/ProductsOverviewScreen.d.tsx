import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { CompositeNavigationProp } from '@react-navigation/native'
import {
  HomeStackParamList,
  ShopDrawerParamList,
} from '../../navigation/paramList'

type ProductsOverviewScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'ProductsOverview'>,
  DrawerNavigationProp<ShopDrawerParamList, 'Home'>,
>

type Props = {
  navigation: ProductsOverviewScreenNavigationProp,
}

export { Props }
