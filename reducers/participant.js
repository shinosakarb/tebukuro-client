// @flow
import { handleActions } from 'redux-actions'
import { Map, List } from 'immutable'

import Actions from '../constants/Actions'
import Messages from '../constants/Messages'

export const participantInitialState = new Map({
  entities: new Map(),
  errors: new List(),
  message: null,
})

const { admittedRegestration, waitlistedRegestration } = Messages.Participants
const participationCompleteMessage = onWaitingList => (
  onWaitingList ? waitlistedRegestration : admittedRegestration
)

const participantReducerMap = {
  [Actions.Event.fetchEvent]: {
    next: (state, action) => (
      state.merge({
        entities: action.payload.entities.participant || {},
        errors: [],
      })
    ),
  },

  [Actions.Event.registerForEvent]: {
    next: (state, action) => {
      const { result, entities } = action.payload
      const { event, participant } = entities
      const { onWaitingList } = event[result].userParticipation

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
        entities: action.payload.entities.participant,
        errors: [],
      })
    ),
    throw: (state, action) => state.merge({ errors: action.payload.errors }),
  },
}

export default handleActions(participantReducerMap, participantInitialState)
