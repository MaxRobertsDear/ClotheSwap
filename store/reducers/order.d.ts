import { ADD_ORDER, SET_ORDERS } from '../actions/orders'
import Order from '../../models/order'
import Cartitem from '../../models/cart-item'

// state
interface OrdersState {
  orders: Order[];
}

// payloads
interface OrderData {
  id: string;
  items: Cartitem[];
  amount: number;
  date: Date;
}

// actions
interface AddOrderAction {
  type: typeof ADD_ORDER;
  orderData: OrderData;
}

interface SetOrderAction {
  type: typeof SET_ORDERS;
  orders: Order[];
}

export type OrderActionTypes = AddOrderAction | SetOrderAction
export { OrdersState }
