import React, { useState, useEffect, useReducer, useCallback } from 'react'
import {
  Button,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'
import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import * as authActions from '../../store/actions/auth'

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

const AuthScreen = () => {
  const dispatch = useDispatch()
  const [isSignup, setIsSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: true,
      password: true,
    },
    formIsValid: false,
  })

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [{ text: 'Okay' }])
    }
  }, [error])

  const signupLoginHandler = async () => {
    if (formState.formIsValid) {
      let action
      if (isSignup) {
        action = authActions.signup(
          formState.inputValues.email,
          formState.inputValues.password,
        )
      } else if (!isSignup) {
        action = authActions.login(
          formState.inputValues.email,
          formState.inputValues.password,
        )
      }
      setIsLoading(true)
      try {
        await dispatch(action)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }
    return
  }

  const textChangeHandler = useCallback(
    (inputIdentifier, text) => {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      let isValid = false
      if (inputIdentifier === 'password' && text.trim().length > 5) {
        isValid = true
      }
      if (inputIdentifier === 'email' && emailRegex.test(text.toLowerCase())) {
        isValid = true
      }
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: text,
        isValid: isValid,
        input: inputIdentifier,
      })
    },
    [dispatchFormState],
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffafbd', '#ffc3a0']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <Input
            label='Email'
            placeholder='example@example.com'
            keyboardType='email-address'
            autoCapitalize='none'
            returnKeyType='next'
            errorText={formState.inputValidities.email}
            value={formState.inputValues.email}
            onChangeText={(input) => textChangeHandler('email', input)}
          />
          <Input
            label='Password'
            placeholder='minimum 6 characters'
            keyboardType='default'
            autoCapitalize='none'
            secureTextEntry
            minLength={5}
            errorText={formState.inputValidities.password}
            value={formState.inputValues.password}
            onChangeText={(input) => textChangeHandler('password', input)}
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size='small' color={Colors.primary} />
            ) : (
              <Button
                title={isSignup ? 'Sign Up' : 'Login'}
                color={Colors.primary}
                onPress={signupLoginHandler}
              />
            )}
            <Button
              title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup((prevState) => !prevState)
              }}
            />
          </View>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    padding: 20,
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
  },
  buttonContainer: {
    marginTop: 10,
  },
})

export default AuthScreen
