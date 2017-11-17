// @flow
import Event from './Event'
import Participant from './Participant'
import * as endpoints from '../constants/endpoints'

export const event = new Event(endpoints.event)
export const participant = new Participant(endpoints.participant)
