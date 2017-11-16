// @flow
import { handleActions } from 'redux-actions'
import Actions from '../constants/Actions'

export const eventInitialState = {}

const eventReducerMap = {
  [Actions.Event.createEvent]: {
    next: (state, action) => action.payload,
    throw: (state, action) => (
      { errors: action.payload.errors }
    ),
  },

  [Actions.Event.fetchEvent]: {
    next: (state, action) => action.payload,
    throw: (state, action) => (
      { errors: action.payload.errors }
    ),
  },
}

export default handleActions(eventReducerMap, eventInitialState)
