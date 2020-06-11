import React from 'react'
import AuthScreen from './AuthScreen'
import { fireEvent, render, wait } from '@testing-library/react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../../App'
import renderer from 'react-test-renderer'

function renderWithRedux(
  ui,
  { initialState, store = createStore(rootReducer, initialState) } = {},
) {
  return {
    ...renderer.create(<Provider store={store}>{ui}</Provider>).toJSON(),
    store,
  }
}
// test('renders correctly', async () => {
// 	const { container, debug, queryByText } = renderWithRedux(<AuthScreen />);
// 	// debug();
// 	// expect(queryByText('Password')).toBeTruthy();
// 	expect(container).toMatchSnapshot();
// });
test('renders correctly', async () => {
  const tree = renderWithRedux(<AuthScreen />)
  expect(tree).toMatchSnapshot()
})
