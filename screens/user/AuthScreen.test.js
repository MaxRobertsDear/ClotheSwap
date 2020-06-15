import React from 'react'
import AuthScreen from './AuthScreen'
import { render } from 'react-native-testing-library'
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
  const { queryByText } = renderWithRedux(<AuthScreen />)
  expect(queryByText('Password')).toBeTruthy()
})

test('renders correctly', async () => {
  const tree = renderWithRedux(<AuthScreen />)
  expect(tree).toMatchSnapshot()
})
