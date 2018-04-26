// @flow
import { handleActions } from 'redux-actions'
import { Map, List } from 'immutable'
import _ from 'lodash'

import Actions from '../constants/Actions'
import ConvertCase from '../utils/ConvertCase'
import Messages from '../constants/Messages'

export const participantInitialState = new Map({
  entities: new Map(),
  errors: new List(),
  message: null,
})

const toCamelCase = payload => (
  _.mapValues(payload, val => ConvertCase.camelKeysOf(val))
)

const { admittedRegestration, waitlistedRegestration } = Messages.Participants
const participationCompleteMessage = onWaitingList => (
  onWaitingList ? waitlistedRegestration : admittedRegestration
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
    next: (state, action) => {
      const participant = toCamelCase(action.payload.entities.participant)
      const { onWaitingList } = participant[action.payload.result]
      return state.mergeDeep({
        entities: participant,
        message: participationCompleteMessage(onWaitingList),
        errors: [],
      })
    },
    throw: (state, action) => state.merge({ errors: action.payload.errors }),
  },

  [Actions.Event.cancelRegistration]: {
    next: (state, action) => (
      state.merge({
        entities: toCamelCase(action.payload.entities.participant),
        errors: [],
      })
    ),
    throw: (state, action) => state.merge({ errors: action.payload.errors }),
  },
}

export default handleActions(participantReducerMap, participantInitialState)
