import { ADD_ORDER, SET_ORDERS } from '../actions/orders'
import Order from '../../models/order'
import { OrdersState, OrderActionTypes } from './order.d'

const initialState: OrdersState = {
  orders: [],
}

export default (state = initialState, action: OrderActionTypes) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      }
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date,
      )
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      }
  }

  return state
}
