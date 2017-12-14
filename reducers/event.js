// @flow
import { handleActions } from 'redux-actions'
import { Map, List } from 'immutable'

import Actions from '../constants/Actions'

export const eventInitialState = new Map({
  entityId: 0,
  entities: new Map(),
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

const eventReducerMap = {
  [Actions.Event.createEvent]: setEvent,
  [Actions.Event.fetchEvent]: setEvent,
  [Actions.Event.registerForEvent]: mergeParticipant,
}

export default handleActions(eventReducerMap, eventInitialState)
