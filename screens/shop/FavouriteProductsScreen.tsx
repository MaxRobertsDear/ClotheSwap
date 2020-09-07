import React, { useCallback, useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../constants/Colors'
import * as favouritesActions from '../../store/actions/favourites'
import { RootState } from '../ProductsRootState'
import { Props } from './ProductsOverviewScreen.d'
import { numberOfItemColumns } from '../../constants/Constants'

const FavouriteProductsScreen = ({ navigation }: Props) => {
  const favourites = useSelector(
    (state: RootState) => state.products.availableProducts,
  )
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError]: any = useState()

  const loadFavourites = useCallback(async () => {
    setIsRefreshing(true)

    setError(null)
    try {
      await dispatch(favouritesActions.fetchFavourites())
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch, setError])

  useEffect(() => {
    setIsLoading(true)
    loadFavourites().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, loadFavourites])

  const selectItemHandler = (id: string, title: string, ownerId: string) => {
    navigation.navigate('ProductDetails', {
      productId: id,
      productTitle: title,
      ownerId: ownerId
    })
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred.</Text>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }
  if (!isLoading && favourites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Products not found. Maybe start adding some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: 'center',
        backgroundColor: 'white',
      }}
      initialNumToRender={6}
      onRefresh={loadFavourites}
      refreshing={isRefreshing}
      data={favourites}
      numColumns={numberOfItemColumns}
      showsVerticalScrollIndicator={false}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          productId={itemData.item.id}
          onClick={() => {
            selectItemHandler(itemData.item.id, itemData.item.title, itemData.item.ownerId)
          }}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default FavouriteProductsScreen