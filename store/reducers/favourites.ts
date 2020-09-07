import { SET_FAVOURITES, CREATE_FAVOURITE } from '../actions/favourites'
import Product from '../../models/product'


const initialState = {
  favourites: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVOURITES:
      return {
        favourites: action.favourites
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
        favourites: state.favourites.concat(newFav)
      }
    default:
      return state
  }
}