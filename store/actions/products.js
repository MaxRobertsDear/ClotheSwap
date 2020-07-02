import * as firebase from 'firebase'

import Product from '../../models/product'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        'https://rn-shop-app-f2dc2.firebaseio.com/products.json',
      )
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      const resData = await response.json()
      const loadedProducts = []
      for (const key in resData) {
        const imageUrl = await firebase
          .storage()
          .ref(`images/${key}`)
          .getDownloadURL()
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            imageUrl,
            resData[key].description,
            resData[key].price,
          ),
        )
      }

      // const downloadImage = async () => {
      //   const ref = firebase
      //     .storage()
      //     .ref()
      //     .child('images/-MBEqgavdPjuG9oNvoGK')
      //   ref.getDownloadURL()
      // }

      // console.log(downloadImage())

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(
          (prod) => prod.ownerId === getState().auth.userId,
        ),
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    await fetch(
      `https://rn-shop-app-f2dc2.firebaseio.com/products/${productId}.json?auth=${
        getState().auth.userId
      }`,
      {
        method: 'DELETE',
      },
    )
    return dispatch({ type: DELETE_PRODUCT, pid: productId })
  }
}
export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://rn-shop-app-f2dc2.firebaseio.com/products.json?auth=${
        getState().auth.token
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: getState().auth.userId,
        }),
      },
    )
    const resData = await response.json()

    const uploadImage = async (uri, prodId) => {
      const response = await fetch(uri)
      const blob = await response.blob()
      // const imageName = uri.split('/').pop()

      const ref = firebase
        .storage()
        .ref()
        .child('images/' + prodId)
      ref.put(blob)
    }

    uploadImage(imageUrl, resData.name)

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: getState().auth.userId,
      },
    })
  }
}

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    await fetch(
      `https://rn-shop-app-f2dc2.firebaseio.com/products/${id}.json?auth=${
        getState().auth.userId
      }`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      },
    )
    const uploadImage = async (uri, prodId) => {
      const response = await fetch(uri)
      const blob = await response.blob()
      // const imageName = uri.split('/').pop()

      const ref = firebase
        .storage()
        .ref()
        .child('images/' + prodId)
      ref.put(blob)
    }

    uploadImage(imageUrl, id)
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    })
  }
}
