import React from 'react'
import { fireEvent, waitFor } from 'react-native-testing-library'
import '@testing-library/jest-native/extend-expect'
import { renderWithRedux } from '../../_testing/custom.render'
import AuthScreen from './AuthScreen'

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

test('user can toggle between login and signup', async () => {
  const { getAllByA11yRole, getByText } = renderWithRedux(<AuthScreen />)

  // user is presented with Login screen by default
  expect(getAllByA11yRole('button')[0]).toHaveTextContent(/Login/i)
  expect(getAllByA11yRole('button')[1]).toHaveTextContent(/Switch to Sign Up/i)

  // when toggling Login/Sign Up, user is presented with appropriate options
  fireEvent.press(getByText(/Switch to Sign Up/i))
  expect(getByText(/Sign Up/i)).toBeTruthy()
  expect(getByText(/Switch to Login/i)).toBeTruthy()
})
