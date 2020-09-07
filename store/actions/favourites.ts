import { AppThunk } from './index.d'

export const CREATE_FAVOURITE = 'CREATE_FAVOURITE'
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

      const favrouiteProducts = []
      favourites.forEach(prodId => {
        favrouiteProducts.push(getState().products.availableProducts.find(
          (prod) => prod.id === prodId,

        ))
      })
      console.log(favourites)
      console.log(favrouiteProducts)
      // console.log(favrouiteProducts)
      // console.log(getState().products.availableProducts)
      // console.log(getState().products.availableProducts.filter(product => product.id === '-MCfzdIzwPgYMi4s-Ro5'))

      // const loadedProducts = []
      // for (const key in resData) {
      //   loadedProducts.push(
      //     new Product({
      //       id: key,
      //       ownerId: resData[key].ownerId,
      //       title: resData[key].title,
      //       imageUrl: imageUrl,
      //       description: resData[key].description,
      //       price: resData[key].price,
      //     }),
      //   )
      // }

      // dispatch({
      //   type: SET_FAVOURITES,
      //   products: loadedProducts,
      //   userProducts: loadedProducts.filter(
      //     (prod) => prod.ownerId === getState().auth.userId,
      //   ),
      // })
    } catch (err) {
      throw new Error(err)
    }
  }
}


export const favouriteProduct = (
  prodId: string,
  ownerId: string
): AppThunk => {
  return async (dispatch, getState) => {
    const response = await fetch(
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
          ownerId: ownerId,
        }),
      },
    )
    const resData = await response.json()
    dispatch({
      type: CREATE_FAVOURITE,
      favouritesData: {
        id: resData.name,
        productId: prodId,
        ownerId: ownerId,
      },
    })
  }
}