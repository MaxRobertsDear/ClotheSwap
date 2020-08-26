import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from '../actions/products'
import Product from '../../models/product'
import { ProductActionTypes, ProductsState } from './products.d'

const initialState: ProductsState = {
  availableProducts: [],
  userProducts: [],
}

export default (state = initialState, action: ProductActionTypes) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      }
    case CREATE_PRODUCT:
      const newProduct = new Product({
        id: action.productData.id,
        ownerId: action.productData.ownerId,
        title: action.productData.title,
        imageUrl: action.productData.imageUrl,
        description: action.productData.description,
        price: action.productData.price,
      })
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      }
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod: { id: string }) => prod.id === action.pid,
      )
      const updatedProduct = new Product({
        id: action.pid,
        ownerId: state.userProducts[productIndex].ownerId,
        title: action.productData.title,
        imageUrl: action.productData.imageUrl,
        description: action.productData.description,
        price: state.userProducts[productIndex].price,
      })
      const updatedUserProducts = [...state.userProducts]
      updatedUserProducts[productIndex] = updatedProduct
      const availableProductIndex = state.availableProducts.findIndex(
        (prod: { id: string }) => prod.id === action.pid,
      )
      const updatedAvailableProducts = [...state.availableProducts]
      updatedAvailableProducts[availableProductIndex] = updatedProduct
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod: { id: string }) => prod.id !== action.pid,
        ),
        availableProducts: state.availableProducts.filter(
          (prod: { id: string }) => prod.id !== action.pid,
        ),
      }
    default:
      return state
  }
}
