// @flow
import { handleActions } from 'redux-actions'
import { Map, List } from 'immutable'
import _ from 'lodash'

import Actions from '../constants/Actions'
import ConvertCase from '../utils/ConvertCase'

const initialId = 0

const toCamelCase = payload => (
  _.mapValues(payload, val => ConvertCase.camelKeysOf(val))
)

export const eventInitialState = new Map({
  entityId: initialId,
  entities: new Map({
    [initialId]: new Map({
      name: null,
      description: null,
      quota: 0,
      eventStartsAt: null,
      eventEndsAt: null,
      registered: false,
      participants: new List([]),
    }),
  }),
  errors: new List(),
})

const setEvent = {
  next: (state, action) => (
    state.merge({
      entityId: action.payload.result,
      entities: toCamelCase(action.payload.entities.event),
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
  [Actions.Event.cancelRegistration]: setEvent,
}

export default handleActions(eventReducerMap, eventInitialState)
