// @flow
import React from 'react'
import type { ComponentType } from 'react'
import { Provider } from 'react-redux'
import configure from '../../store'

const store = configure()

type Props = {}

const withProvider = (Component: ComponentType<Props>) => {
  const Wrapper = (props: Props) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  )
  Wrapper.displayName = `withProvider${Component.displayName || Component.name}`
  return Wrapper
}

export default withProvider
