import { createAction } from 'redux-actions'
import { List, Map } from 'immutable'

import EventReducer, { eventInitialState } from '../event'
import Actions from '../../constants/Actions'
import ApiResponseError from '../../api/ApiResponseError'

import EventParams from '../../factories/Event'
import ParticipantParams from '../../factories/Participant'

const { participant1 } = ParticipantParams
const { event1 } = EventParams

const eventPayload = {
  result: event1.id,
  entities: { event: { [event1.id]: event1 } },
  errors: [],
}

const error = {
  response: { data: { name: ['を入力して下さい', 'は１０文字以下です'] } },
}
const errorMessages = new List(['nameを入力して下さい', 'nameは１０文字以下です'])

describe('Event Reducer', () => {
  describe('when initial state', () => {
    it('should return the initial state', () => {
      expect(EventReducer(undefined, { type: '@@INIT' })).toEqual(eventInitialState)
    })
  })

  describe('when CREATE_EVENT action', () => {
    const createEvent = createAction(Actions.Event.createEvent)

    describe('with success event create', () => {
      it('should return created event', () => {
        const subject = EventReducer(eventInitialState, createEvent(eventPayload))
        const expectedState = new Map({
          entityId: event1.id,
          entities: new Map({
            [event1.id]: new Map({ ...event1, participants: new List() }),
          }),
          errors: new List(),
        })

        expect(subject).toEqual(expectedState)
      })
    })

    describe('with failure event create', () => {
      it('should return error message', () => {
        const subject = EventReducer(eventInitialState, createEvent(new ApiResponseError(error)))
        expect(subject.get('errors')).toEqual(errorMessages)
      })
    })
  })

  describe('when FETCH_EVENT action', () => {
    const fetchEvent = createAction(Actions.Event.fetchEvent)

    describe('with success event fetch', () => {
      it('should return fetched event', () => {
        const subject = EventReducer(eventInitialState, fetchEvent(eventPayload))
        const expectedState = new Map({
          entityId: event1.id,
          entities: new Map({
            [event1.id]: new Map({ ...event1, participants: new List() }),
          }),
          errors: new List(),
        })

        expect(subject).toEqual(expectedState)
      })
    })

    describe('with failure event fetch', () => {
      it('should return error message', () => {
        const subject = EventReducer(eventInitialState, fetchEvent(new ApiResponseError(error)))
        expect(subject.get('errors')).toEqual(errorMessages)
      })
    })
  })

  describe('when REGISTER_FOR_EVENT action', () => {
    const registerForEvent = createAction(Actions.Event.registerForEvent)
    const prevState = new Map({
      entityId: event1.id,
      entities: new Map({
        [event1.id]: new Map({
          ...event1,
          participants: new List(),
        }),
      }),
      errors: new List(),
    })

    const participantPayload = { result: participant1.id }

    describe('with success event register', () => {
      it('should add registered participant', () => {
        const subject = EventReducer(prevState, registerForEvent(participantPayload))
        const expectedState =
          prevState.setIn(['entities', '1', 'participants'], new List([participant1.id]))

        expect(subject).toEqual(expectedState)
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

    const prevState = new Map({
      entityId: event1.id,
      entities: new Map({
        [event1.id]: new Map({
          ...event1, participants: new List([participant1.id]),
        }),
      }),
      errors: new List(),
    })

    describe('with success cancel registration', () => {
      it('should delete registered participant', () => {
        const subject = EventReducer(prevState, cancelRegistration(eventPayload))
        const expectedState = prevState.setIn(['entities', '1', 'participants'], new List())

        expect(subject).toEqual(expectedState)
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
