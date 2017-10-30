// @flow
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'
import Reducers from '../reducers'

export default (initialState: Object = {}) => {
  const middlewares = [promiseMiddleware, thunkMiddleware]

  const store = createStore(Reducers, initialState, applyMiddleware(...middlewares))

  return store
}
