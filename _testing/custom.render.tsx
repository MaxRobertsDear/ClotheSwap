import React, { FunctionComponent, ReactElement } from 'react'
import { createStore, Store } from 'redux'
import { Provider } from 'react-redux'
import { render, RenderOptions } from 'react-native-testing-library'
import rootReducer from '../store/reducers'

interface ICustomRenderOptions extends RenderOptions {
  initialState?: any;
  store?: Store;
}
function renderWithRedux(
  ui: ReactElement,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...options
  }: ICustomRenderOptions = {},
) {
  const Wrapper: FunctionComponent = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
  }
}

export { renderWithRedux }
