// @flow
import { createAction } from 'redux-actions'
import ActionsType from '../constants/Actions'
// TODO: Enable ESLint and flow check after API implemented.
/* eslint-disable */
// flow-disable-nextline
import EventAPI from '../api/Event'

export const createEvent = createAction(ActionsType.Event.createEvent, EventAPI.create)
