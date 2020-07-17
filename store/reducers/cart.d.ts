import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import { ADD_ORDER } from '../actions/orders'
import { DELETE_PRODUCT } from '../actions/products'

// state
interface CartState {
  items: Product[];
  totalAmount: number;
}

// actions
interface AddToCartAction {
  type: typeof ADD_TO_CART;
  product: Product;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  pid: number;
}

interface AddOrderAction {
  type: typeof ADD_ORDER;
}

interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  pid: number;
}

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | AddOrderAction
  | DeleteProductAction
export { CartState }
