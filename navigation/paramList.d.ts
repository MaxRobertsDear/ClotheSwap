// ShopNavigator
type HomeStackParamList = {
  ProductsOverview: undefined,
  ProductDetails: {
    productId: string,
    productTitle: string,
  },
  CartScreen: undefined,
}

type ProfileStackParamList = {
  UserProductsScreen: undefined,
  EditProductsScreen: { productId: string },
}

type OrdersStackParamList = {
  OrdersScreen: undefined,
}

type ShopTabParamList = {
  Home: undefined,
  Profile: undefined,
}

type ShopDrawerParamList = {
  Shop: undefined,
  Orders: undefined,
}

// AuthNavigator
type AuthStackParamList = {
  AuthScreen: undefined,
}

export {
  HomeStackParamList,
  ProfileStackParamList,
  OrdersStackParamList,
  ShopTabParamList,
  ShopDrawerParamList,
  AuthStackParamList,
}
