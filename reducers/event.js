// @flow
import { handleActions } from 'redux-actions'
import Actions from '../constants/Actions'
import EventModel from '../models/Event'
import ParticipantModel from '../models/Participant'
import ConvertCase from '../utils/ConvertCase'

export const eventInitialState = new EventModel()

const eventReducerMap = {
  [Actions.Event.createEvent]: {
    next: (state, action) => new EventModel(action.payload),
    throw: (state, action) => (
      new EventModel({ errors: action.payload.errors })
    ),
  },

  [Actions.Event.fetchEvent]: {
    next: (state, action) => new EventModel(action.payload),
    throw: (state, action) => (
      new EventModel({ errors: action.payload.errors })
    ),
  },

  [Actions.Event.joinEvent]: {
    next: (state, action) => {
      const participant = new ParticipantModel(ConvertCase.camelKeysOf(action.payload))
      // Clear error message of previous error.
      const event = state.set('errors', [])

      return event.setParticipants([...state.get('participants'), participant])
    },
    throw: (state, action) => (
      state.set('errors', action.payload.errors)
    ),
  },
}

export default handleActions(eventReducerMap, eventInitialState)
