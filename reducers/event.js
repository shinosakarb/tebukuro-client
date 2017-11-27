// @flow
import { handleActions } from 'redux-actions'
import Actions from '../constants/Actions'
import ConvertCase from '../utils/ConvertCase'

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

  [Actions.Event.joinEvent]: {
    next: (state, action) => {
      const partricipant = ConvertCase.camelKeysOf(action.payload)
      return {
        ...state,
        participants: [...state.participants, partricipant],
      }
    },
    throw: (state, action) => (
      { ...state, errors: action.payload.errors }
    ),
  },
}

export default handleActions(eventReducerMap, eventInitialState)
