// @flow
import { createAction } from 'redux-actions'
import ActionsType from '../constants/Actions'
import eventFormValidator from '../validators/eventFormValidator'

// eslint-disable-next-line import/prefer-default-export
export const validateEventForm =
  createAction(ActionsType.EventForm.validateEventParam, eventFormValidator)
