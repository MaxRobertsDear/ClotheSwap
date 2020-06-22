import React, {
  useLayoutEffect,
  useCallback,
  useReducer,
  useState,
} from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import * as productActions from '../../store/actions/products'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    }
    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    }
  }
  return state
}

const EditProductScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const prodId = route.params && route.params.productId
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId),
  )
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  })

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input', 'Please check the errors on the screen', [
        { text: 'Okay' },
      ])
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      if (editedProduct) {
        await dispatch(
          productActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
          ),
        )
      } else {
        await dispatch(
          productActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
          ),
        )
      }
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
    navigation.goBack()
  }, [dispatch, formState, prodId, editedProduct, navigation])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params && route.params.productId ? 'Edit Item' : 'Add Item',
    })
  }, [navigation, prodId, formState.inputValues.title, route.params])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomHeaderButton iconName='save' onPress={submitHandler} />
      ),
    })
  }, [submitHandler, navigation])

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false
    if (text.trim().length > 0) {
      isValid = true
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    })
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label='Title'
          errorText={formState.inputValidities.title}
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType='next'
          value={formState.inputValues.title}
          onChangeText={(input) => textChangeHandler('title', input)}
        />

        <Input
          label='Image Url'
          errorText={formState.inputValidities.imageUrl}
          returnKeyType='next'
          value={formState.inputValues.imageUrl}
          onChangeText={(input) => textChangeHandler('imageUrl', input)}
        />

        {editedProduct ? null : (
          <Input
            label='Price'
            errorText={formState.inputValidities.price}
            keyboardType='decimal-pad'
            returnKeyType='next'
            value={formState.inputValues.price}
            onChangeText={(input) => textChangeHandler('price', input)}
          />
        )}
        <Input
          label='Description'
          errorText={formState.inputValidities.description}
          autoCapitalize='sentences'
          autoCorrect
          multiline
          value={formState.inputValues.description}
          onChangeText={(input) => textChangeHandler('description', input)}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default EditProductScreen
