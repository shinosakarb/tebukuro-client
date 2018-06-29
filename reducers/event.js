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
      eventStartsAt: null,
      eventEndsAt: null,
      userParticipation: new Map({
        registered: false,
        onWaitingList: false,
      }),
      participants: new List([]),
    }),
  }),
  errors: new List(),
})

const setEvent = {
  next: (state, action) => state.merge({
    entityId: action.payload.result,
    entities: action.payload.entities.event,
    errors: [],
  }),
  throw: (state, action) => state.merge({ errors: action.payload.errors }),
}

const eventReducerMap = {
  [Actions.Event.createEvent]: setEvent,
  [Actions.Event.fetchEvent]: setEvent,
  [Actions.Event.registerForEvent]: setEvent,
  [Actions.Event.cancelRegistration]: setEvent,
}

export default handleActions(eventReducerMap, eventInitialState)
