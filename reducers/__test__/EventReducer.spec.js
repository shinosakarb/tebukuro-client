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

  describe('when dispached CREATE_EVENT action', () => {
    const createEvent = createAction(Actions.Event.createEvent)
    const errorMessage = 'ERROR!'

    describe('with success event create', () => {
      it('should return created event', () => {
        const eventState = EventReducer(null, createEvent(EventParams.event1))
        expect(eventState).toEqual(EventParams.event1)
      })
    })

    describe('with failure event create', () => {
      it('should return error message', () => {
        const eventState = EventReducer(null, createEvent(new Error(errorMessage)))
        expect(eventState).toEqual({ errors: errorMessage })
      })
    })
  })
})
