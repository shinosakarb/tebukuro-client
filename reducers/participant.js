// @flow
import { handleActions } from 'redux-actions'
import { normalize } from 'normalizr'
import { Map, List } from 'immutable'
import _ from 'lodash'

import Actions from '../constants/Actions'
import EventSchema from '../schemas/event'
import ParticipantSchema from '../schemas/participant'
import ConvertCase from '../utils/ConvertCase'

export const participantInitialState = new Map({
  entities: new Map(),
  errors: new List(),
})

const toCamelCase = payload => (
  _.mapValues(payload, val => ConvertCase.camelKeysOf(val))
)

// TODO: Normalize in Reducer is **NOT** recommended. Need to be refactored.
const participantReducerMap = {
  [Actions.Event.fetchEvent]: {
    next: (state, action) => {
      const normalizedPayload = normalize(action.payload, EventSchema)
      const participant = toCamelCase(normalizedPayload.entities.participant)

      return state.merge({
        entities: participant,
        errors: [],
      })
    },
  },

  [Actions.Event.registerForEvent]: {
    next: (state, action) => {
      const normalizedPayload = normalize(action.payload, ParticipantSchema)
      const participant = toCamelCase(normalizedPayload.entities.participant)

      return state.mergeDeep({
        entities: participant,
        errors: [],
      })
    },
    throw: (state, action) => state.merge({ errors: action.payload.errors }),
  },
}

export default handleActions(participantReducerMap, participantInitialState)
