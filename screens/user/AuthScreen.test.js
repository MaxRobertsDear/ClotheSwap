import React from 'react'
import AuthScreen from './AuthScreen'
import { render, fireEvent, waitFor } from 'react-native-testing-library'
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
  const {
    queryByPlaceholder,
    queryByText,
    getByDisplayValue,
    getByText,
  } = renderWithRedux(<AuthScreen />)
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

  expect(getByDisplayValue('123456')).toBeTruthy()
  expect(getByDisplayValue('jondoe@email.com')).toBeTruthy()
  expect(emailValidationMessage).not.toBeTruthy()
  expect(passwordValidationMessage).not.toBeTruthy()

  // validation prompts shown on invalid entries
  fireEvent.changeText(passwordField, '123')
  fireEvent.changeText(emailField, 'email@email.com')
  fireEvent.changeText(emailField, '')

  expect(getByDisplayValue('123')).toBeTruthy()
  expect(getByDisplayValue('')).toBeTruthy()
  await waitFor(() => getByText(/Please enter a valid Password/i))
  await waitFor(() => getByText(/Please enter a valid Email/i))
})
