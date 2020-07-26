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

type ShopTabParamList = {
  Home: undefined,
  Orders: undefined,
  Admin: undefined,
}

type ShopDrawerParamList = {
  Shop: undefined,
}

// AuthNavigator
type AuthStackParamList = {
  AuthScreen: undefined,
}

export {
  HomeStackParamList,
  AdminStackParamList,
  OrdersStackParamList,
  ShopTabParamList,
  ShopDrawerParamList,
  AuthStackParamList,
}
