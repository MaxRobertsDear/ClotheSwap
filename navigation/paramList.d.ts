// ShopNavigator
type HomeStackParamList = {
  ProductsOverview: undefined,
  ProductDetails: {
    productId: string,
    productTitle: string,
  },
  CartScreen: undefined,
}

type AdminStackParamList = {
  UserProductsScreen: undefined,
  EditProductsScreen: { productId: string },
}

type OrdersStackParamList = {
  OrdersScreen: undefined,
}

type ShopDrawerParamList = {
  Home: undefined,
  Orders: undefined,
  Admin: undefined,
}

// AuthNavigator
type AuthStackParamList = {
  AuthScreen: undefined,
}

export {
  HomeStackParamList,
  AdminStackParamList,
  OrdersStackParamList,
  ShopDrawerParamList,
  AuthStackParamList,
}
