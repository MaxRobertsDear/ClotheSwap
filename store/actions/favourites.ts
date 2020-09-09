import { AppThunk } from './index.d'

export const CREATE_FAVOURITE = 'CREATE_FAVOURITE'
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE'
export const SET_FAVOURITES = 'SET_FAVOURITES'

export const fetchFavourites = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://rn-shop-app-f2dc2.firebaseio.com/favourites/${getState().auth.userId}/.json?auth=${
        getState().auth.token
        }`,
      )
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      const resData = await response.json()
      const favourites = []
      Object.values(resData).forEach(item => favourites.push(item.productId))

      const favouriteProducts = []
      favourites.forEach(prodId => {
        favouriteProducts.push(getState().products.availableProducts.find(
          (prod) => prod.id === prodId,
        ))
      })
      dispatch({
        type: SET_FAVOURITES,
        favourites: favouriteProducts,
        favIds: favourites
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}


export const favouriteProduct = (
  prodId: string,
  ownerId: string,
  title: string,
  imageUrl: string,
  description: string,
  price: number,
): AppThunk => {
  return async (dispatch, getState) => {
    await fetch(
      `https://rn-shop-app-f2dc2.firebaseio.com/favourites/${getState().auth.userId}/.json?auth=${
      getState().auth.token
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: prodId,
        }),
      },
    )
    dispatch({
      type: CREATE_FAVOURITE,
      favouritesData: {
        productId: prodId,
        ownerId: ownerId,
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price,
      },
    })
  }
}

export const unfavouriteProduct = (
  prodId: string,
): AppThunk => {
  // TODO target the productId of the item to be deleted
  return async (dispatch, getState) => {
    await fetch(
      `https://rn-shop-app-f2dc2.firebaseio.com/favourites/${getState().auth.userId}/${prodId}/.json?auth=${
      getState().auth.token
      }`,
      {
        method: 'DELETE',
      },
    )
    dispatch({
      type: REMOVE_FAVOURITE, productId: prodId,
    })
  }
}