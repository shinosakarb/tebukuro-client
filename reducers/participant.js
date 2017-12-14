// @flow
import { handleActions } from 'redux-actions'
import { Map, List } from 'immutable'
import _ from 'lodash'

import Actions from '../constants/Actions'
import ConvertCase from '../utils/ConvertCase'

export const participantInitialState = new Map({
  entities: new Map(),
  errors: new List(),
})

const toCamelCase = payload => (
  _.mapValues(payload, val => ConvertCase.camelKeysOf(val))
)

const participantReducerMap = {
  [Actions.Event.fetchEvent]: {
    next: (state, action) => (
      state.merge({
        entities: toCamelCase(action.payload.entities.participant),
        errors: [],
      })
    ),
  },

  [Actions.Event.registerForEvent]: {
    next: (state, action) => (
      state.mergeDeep({
        entities: toCamelCase(action.payload.entities.participant),
        errors: [],
      })
    ),
    throw: (state, action) => state.merge({ errors: action.payload.errors }),
  },
}

export default handleActions(participantReducerMap, participantInitialState)
