import { createAction } from 'redux-actions'
import { normalize } from 'normalizr'
import { List } from 'immutable'

import EventReducer, { eventInitialState } from '../event'
import Actions from '../../constants/Actions'
import ApiResponseError from '../../api/ApiResponseError'
import EventParams from '../../factories/Event'
import ParticipantParams from '../../factories/Participant'
import EventSchema from '../../schemas/event'
import ParticipantSchema from '../../schemas/participant'

const { participant1 } = ParticipantParams
const { event1 } = EventParams

const normalizedEvent = normalize(event1, EventSchema)
const normalizedParticipant = normalize(participant1, ParticipantSchema)

const initialState = eventInitialState
const eventMergedState = initialState.merge({
  entityId: event1.id,
  entities: { [event1.id]: event1 },
  errors: [],
})

const error = {
  response: { data: { name: ['を入力して下さい', 'は１０文字以下です'] } },
}
const errorMessages = new List(['nameを入力して下さい', 'nameは１０文字以下です'])

describe('Event Reducer', () => {
  describe('when initial state', () => {
    it('should return the initial state', () => {
      expect(EventReducer(undefined, {})).toEqual(initialState)
    })
  })

  describe('when CREATE_EVENT action', () => {
    const createEvent = createAction(Actions.Event.createEvent)

    describe('with success event create', () => {
      it('should return created event', () => {
        const subject = EventReducer(initialState, createEvent(normalizedEvent))
        expect(subject).toEqual(eventMergedState)
      })
    })

    describe('with failure event create', () => {
      it('should return error message', () => {
        const subject = EventReducer(initialState, createEvent(new ApiResponseError(error)))
        expect(subject.get('errors')).toEqual(errorMessages)
      })
    })
  })

  describe('when FETCH_EVENT action', () => {
    const fetchEvent = createAction(Actions.Event.fetchEvent)

    describe('with success event fetch', () => {
      it('should return fetched event', () => {
        const subject = EventReducer(initialState, fetchEvent(normalizedEvent))
        expect(subject).toEqual(eventMergedState)
      })
    })

    describe('with failure event fetch', () => {
      it('should return error message', () => {
        const subject = EventReducer(initialState, fetchEvent(new ApiResponseError(error)))
        expect(subject.get('errors')).toEqual(errorMessages)
      })
    })
  })

  describe('when REGISTER_FOR_EVENT action', () => {
    const registerForEvent = createAction(Actions.Event.registerForEvent)

    const prevState = eventMergedState
    const eventId = prevState.get('entityId').toString()
    const nextState = prevState.updateIn(
      ['entities', eventId, 'participants'],
      participants => participants.push(participant1.id),
    )

    describe('with success event register', () => {
      it('should add registered participant', () => {
        const subject = EventReducer(prevState, registerForEvent(normalizedParticipant))
        expect(subject).toEqual(nextState)
      })
    })

    describe('with failure event registerFor', () => {
      it('should keep previous state', () => {
        const subject = EventReducer(prevState, registerForEvent(new ApiResponseError(error)))
        expect(subject).toEqual(prevState)
      })
    })
  })

  describe('when CANCEL_REGISTRATION action', () => {
    const cancelRegistration = createAction(Actions.Event.cancelRegistration)

    const eventId = eventMergedState.get('entityId').toString()
    const prevState = eventMergedState.updateIn(
      ['entities', eventId, 'participants'],
      participants => participants.push(participant1.id),
    )
    const nextState = eventMergedState

    describe('with success cancel registration', () => {
      it('should delete registered participant', () => {
        const subject = EventReducer(prevState, cancelRegistration(normalizedEvent))
        expect(subject).toEqual(nextState)
      })
    })

    describe('with failure cancel registration', () => {
      it('should keep previous state', () => {
        const subject = EventReducer(prevState, cancelRegistration(new ApiResponseError(error)))
        expect(subject.get('errors')).toEqual(errorMessages)
      })
    })
  })
})
