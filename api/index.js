// @flow
import Event from './Event'
import Participant from './Participant'
import Auth from './Auth'
import * as endpoints from '../constants/endpoints'

export const event = new Event(endpoints.event)
export const participant = new Participant(endpoints.participant)
export const auth = new Auth(endpoints.auth)
