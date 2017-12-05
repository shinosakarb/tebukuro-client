import { createAction } from 'redux-actions'
import { List } from 'immutable'

import EventReducer, { eventInitialState } from '../event'
import Actions from '../../constants/Actions'
import ApiResponseError from '../../api/ApiResponseError'
import EventParams from '../../factories/Event'
import ParticipantParams from '../../factories/Participant'

const initialState = eventInitialState
const testEventParams = EventParams.event1
const testParticipantParams = ParticipantParams.participant1

const testEventResult = initialState.merge({
  entityId: testEventParams.id,
  entities: { [testEventParams.id]: testEventParams },
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
        const subject = EventReducer(initialState, createEvent(testEventParams))
        expect(subject).toEqual(testEventResult)
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
        const subject = EventReducer(initialState, fetchEvent(testEventParams))
        expect(subject).toEqual(testEventResult)
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

    const prevState = testEventResult
    const eventId = prevState.get('entityId').toString()
    const nextState = prevState.updateIn(
      ['entities', eventId, 'participants'],
      participants => participants.push(testParticipantParams.id),
    )

    describe('with success event register', () => {
      it('should add registered participant', () => {
        const subject = EventReducer(prevState, registerForEvent(testParticipantParams))
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
})
