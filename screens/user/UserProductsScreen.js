import React, { useLayoutEffect } from 'react'
import { FlatList, Button, Alert, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../constants/Colors'
import * as productActions from '../../store/actions/products'

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomHeaderButton
          iconName='navicon'
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
    })
  }, [navigation])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomHeaderButton
          iconName='plus'
          onPress={() => {
            navigation.navigate('EditProductsScreen')
          }}
        />
      ),
    })
  }, [navigation])

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delte this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(id))
        },
      },
    ])
  }

  const editProductHandler = (id) => {
    navigation.navigate('EditProductsScreen', { productId: id })
  }

  if (!userProducts.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found. Maybe you should create some</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
        >
          <Button
            color={Colors.primary}
            title='Edit'
            onPress={() => {
              editProductHandler(itemData.item.id)
            }}
          />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  )
}

export default UserProductsScreen
