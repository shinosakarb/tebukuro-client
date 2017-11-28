// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'

import Immutable from 'immutable'
import Records from '../models'
import Reducers from '../reducers'

export default (initialState: Object = {}) => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize: {
          immutable: Immutable,
          refs: Records,
        },
      }) : compose
  /* eslint-enable */

  const middlewares = [promiseMiddleware, thunkMiddleware]

  const store = createStore(
    Reducers, initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  return store
}
