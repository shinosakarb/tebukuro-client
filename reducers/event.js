// @flow
import { handleActions } from 'redux-actions'
import { normalize } from 'normalizr'
import { Map, List } from 'immutable'

import Actions from '../constants/Actions'
import EventSchema from '../schemas/event'

export const eventInitialState = new Map({
  entityId: 0,
  entities: new Map(),
  errors: new List(),
})

// TODO: Normalize in Reducer is **NOT** recommended. Need to be refactored.
const setEvent = {
  next: (state, action) => {
    const normalizedPayload = normalize(action.payload, EventSchema)

    return state.merge({
      entityId: normalizedPayload.result,
      entities: normalizedPayload.entities.event,
      errors: [],
    })
  },
  throw: (state, action) => state.merge({ errors: action.payload.errors }),
}

const mergeParticipant = {
  next: (state, action) => {
    const eventId = state.get('entityId').toString()
    const participantId = action.payload.id

    return state.updateIn(
      ['entities', eventId, 'participants'],
      participants => participants.push(participantId),
    )
  },
}

const eventReducerMap = {
  [Actions.Event.createEvent]: setEvent,
  [Actions.Event.fetchEvent]: setEvent,
  [Actions.Event.registerForEvent]: mergeParticipant,
}

export default handleActions(eventReducerMap, eventInitialState)
