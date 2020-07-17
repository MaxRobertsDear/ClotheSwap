import Order from '../../models/order'
import { AppThunk } from './index.d'
import Cartitem from '../../models/cart-item'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://rn-shop-app-f2dc2.firebaseio.com/orders/${
          getState().auth.userId
        }.json?auth=${getState().auth.token}`,
      )
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      const resData = await response.json()
      const loadedOrders = []
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date),
          ),
        )
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders })
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const addOrders = (
  cartItems: Cartitem[],
  totalAmount: number,
): AppThunk => {
  return async (dispatch, getState) => {
    const date = new Date()
    const response = await fetch(
      `https://rn-shop-app-f2dc2.firebaseio.com/orders/${
        getState().auth.userId
      }.json?auth=${getState().auth.token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      },
    )

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    const resData = await response.json()

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    })
  }
}
