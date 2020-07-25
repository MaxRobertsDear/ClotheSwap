import productsReducer from './products'
import cartReducer from './cart'
import ordersReducer from './order'
import authReducer from './auth'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
})

export default rootReducer
