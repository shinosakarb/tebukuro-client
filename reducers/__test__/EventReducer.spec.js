import { createAction } from 'redux-actions'
import EventReducer, { eventInitialState } from '../event'
import Actions from '../../constants/Actions'
import EventParams from '../../factories/Event'

describe('Event Reducer', () => {
  describe('when initial state', () => {
    it('should return the initial state', () => {
      expect(EventReducer(undefined, {})).toEqual(eventInitialState)
    })
  })

  describe('when CREATE_EVENT action', () => {
    const createEvent = createAction(Actions.Event.createEvent)
    const errorMessages = ['ERROR1', 'ERROR2']

    describe('with success event create', () => {
      it('should return created event', () => {
        const eventState = EventReducer(null, createEvent(EventParams.event1))
        expect(eventState).toEqual(EventParams.event1)
      })
    })

    // TODO: Fix error object to API Error object after API implemented.
    describe('with failure event create', () => {
      it('should return error message', () => {
        const eventState = EventReducer(null, createEvent(new Error(errorMessages)))
        expect(eventState.errors).toEqual(errorMessages.toString())
      })
    })
  })

  describe('when FETCH_EVENT action', () => {
    const fetchEvent = createAction(Actions.Event.fetchEvent)
    const errorMessages = ['ERROR1', 'ERROR2']

    describe('with success event fetch', () => {
      it('should return fetched event', () => {
        const eventState = EventReducer(null, fetchEvent(EventParams.event1))
        expect(eventState).toEqual(EventParams.event1)
      })
    })

    // TODO: Fix error object to API Error object after API implemented.
    describe('with failure event fetch', () => {
      it('should return error message', () => {
        const eventState = EventReducer(null, fetchEvent(new Error(errorMessages)))
        expect(eventState.errors).toEqual(errorMessages.toString())
      })
    })
  })
})
