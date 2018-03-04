// @flow
import { handleActions } from 'redux-actions'
import { Map, List } from 'immutable'

import Actions from '../constants/Actions'

const initialId = 0

export const eventInitialState = new Map({
  entityId: initialId,
  entities: new Map({
    [initialId]: new Map({
      name: null,
      description: null,
      quota: 0,
      participants: new List([]),
    }),
  }),
  errors: new List(),
})

const setEvent = {
  next: (state, action) => (
    state.merge({
      entityId: action.payload.result,
      entities: action.payload.entities.event,
      errors: [],
    })
  ),
  throw: (state, action) => state.merge({ errors: action.payload.errors }),
}

const mergeParticipant = {
  next: (state, action) => {
    const eventId = state.get('entityId').toString()
    const participantId = action.payload.result

    return state.updateIn(
      ['entities', eventId, 'participants'],
      participants => participants.push(participantId),
    )
  },
}

const deleteParticipant = {
  next: (state, action) => {
    const eventId = state.get('entityId').toString()
    const participantId = action.payload.id

    return state.updateIn(
      ['entities', eventId, 'participants'],
      participants => participants.filter(id => id !== participantId),
    )
  },
}

const eventReducerMap = {
  [Actions.Event.createEvent]: setEvent,
  [Actions.Event.fetchEvent]: setEvent,
  [Actions.Event.registerForEvent]: mergeParticipant,
  [Actions.Event.cancelRegistration]: deleteParticipant,
}

export default handleActions(eventReducerMap, eventInitialState)
