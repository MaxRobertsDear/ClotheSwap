import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { renderWithRedux } from '../../_testing/custom.render'
import { Home } from '../../navigation/ShopNavigator'
import { initialState } from '../../_testing/mock.data'
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

test('products overview screen renders correctly', async () => {
  const component = (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  )
  const tree = renderWithRedux(component, { initialState: initialState })
  expect(tree).toMatchSnapshot()
})
