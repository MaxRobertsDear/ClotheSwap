import { SET_FAVOURITES, CREATE_FAVOURITE, REMOVE_FAVOURITE } from '../actions/favourites'
import Product from '../../models/product'


const initialState = {
  favourites: [],
  favIds: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVOURITES:
      return {
        favourites: action.favourites,
        favIds: action.favIds
      }
    case CREATE_FAVOURITE:
      const newFav = new Product({
        id: action.favouritesData.productId,
        ownerId: action.favouritesData.ownerId,
        title: action.favouritesData.title,
        imageUrl: action.favouritesData.imageUrl,
        description: action.favouritesData.description,
        price: action.favouritesData.price,
      })
      return {
        ...state,
        favourites: state.favourites.concat(newFav),
        favIds: state.favIds.concat(action.favouritesData.productId)
      }
    case REMOVE_FAVOURITE:
      return {
        ...state,
        favourites: state.favourites.filter(
          product => product.id !== action.productId
        ),
        favIds: state.favIds.includes(!action.productId)
      }
    default:
      return state
  }
}