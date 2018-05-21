// @flow
import { handleActions } from 'redux-actions'
import { Map, List } from 'immutable'

import Actions from '../constants/Actions'

export const eventFormInitialState = new Map({
  name: new Map({
    validationPassed: false,
    errors: new List(),
  }),
  quota: new Map({
    validationPassed: false,
    errors: new List(),
  }),
  eventStartsAt: new Map({
    validationPassed: false,
    errors: new List(),
  }),
  eventEndsAt: new Map({
    validationPassed: false,
    errors: new List(),
  }),
})

const validateEventForm = {
  next: (state, action) => {
    const { id, validationPassed, errors } = action.payload
    return state.merge({ [id]: { validationPassed, errors } })
  },
}

const eventFormReducerMap = {
  [Actions.EventForm.validateEventParam]: validateEventForm,
}

export default handleActions(eventFormReducerMap, eventFormInitialState)
