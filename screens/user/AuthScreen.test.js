import React from 'react'
import AuthScreen from './AuthScreen'
import { render, fireEvent } from 'react-native-testing-library'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../../App'

function renderWithRedux(
  ui,
  { initialState, store = createStore(rootReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}
test('renders correctly', async () => {
  const tree = renderWithRedux(<AuthScreen />)
  expect(tree).toMatchSnapshot()
})
test('email and password fields correctly update with appropriate validation messages', async () => {
  const { queryByPlaceholder, queryByText } = renderWithRedux(<AuthScreen />)
  const passwordField = queryByPlaceholder('minimum 6 characters')
  const emailField = queryByPlaceholder('example@example.com')
  const emailValidationMessage = queryByText(/Please enter a valid Email/i)
  const passwordValidationMessage = queryByText(
    /Please enter a valid Password/i,
  )
  // no validation messages on screen start
  expect(emailValidationMessage).not.toBeTruthy()
  expect(passwordValidationMessage).not.toBeTruthy()

  // user fills out required fields correctly
  fireEvent.changeText(passwordField, '123456')
  fireEvent.changeText(emailField, 'jondoe@email.com')

  expect(passwordField).toHaveProp('value', '123456')
  expect(emailField).toHaveProp('value', 'jondoe@email.com')
  expect(emailValidationMessage).not.toBeTruthy()
  expect(passwordValidationMessage).not.toBeTruthy()

  // can successfully change input before submittal
  fireEvent.changeText(passwordField, 'password')
  fireEvent.changeText(emailField, 'email@email.com')

  expect(passwordField).toHaveProp('value', 'password')
  expect(emailField).toHaveProp('value', 'email@email.com')
})
