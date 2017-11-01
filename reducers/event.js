// @flow
import { handleActions } from 'redux-actions'
import Actions from '../constants/Actions'

export const eventInitialState = {}

const eventReducerMap = {
  [Actions.Event.createEvent]: {
    next: (state, action) => action.payload,
    throw: (state, action) => (
      { errors: action.payload.message }
    ),
  },

  [Actions.Event.fetchEvent]: {
    next: (state, action) => action.payload,
    throw: (state, action) => (
      { errors: action.payload.message }
    ),
  },
}

export default handleActions(eventReducerMap, eventInitialState)
