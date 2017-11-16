import { createAction } from 'redux-actions'
import EventReducer, { eventInitialState } from '../event'
import Actions from '../../constants/Actions'
import EventParams from '../../factories/Event'
import ApiResponseError from '../../api/ApiResponseError'

const error = {
  response: { data: { name: ['を入力して下さい', 'は１０文字以下です'] } },
}

const errorMessages = ['nameを入力して下さい', 'nameは１０文字以下です']

describe('Event Reducer', () => {
  describe('when initial state', () => {
    it('should return the initial state', () => {
      expect(EventReducer(undefined, {})).toEqual(eventInitialState)
    })
  })

  describe('when CREATE_EVENT action', () => {
    const createEvent = createAction(Actions.Event.createEvent)

    describe('with success event create', () => {
      it('should return created event', () => {
        const eventState = EventReducer(null, createEvent(EventParams.event1))
        expect(eventState).toEqual(EventParams.event1)
      })
    })

    describe('with failure event create', () => {
      it('should return error message', () => {
        const eventState = EventReducer(null, createEvent(new ApiResponseError(error)))
        expect(eventState.errors).toEqual(errorMessages)
      })
    })
  })

  describe('when FETCH_EVENT action', () => {
    const fetchEvent = createAction(Actions.Event.fetchEvent)

    describe('with success event fetch', () => {
      it('should return fetched event', () => {
        const eventState = EventReducer(null, fetchEvent(EventParams.event1))
        expect(eventState).toEqual(EventParams.event1)
      })
    })

    describe('with failure event fetch', () => {
      it('should return error message', () => {
        const eventState = EventReducer(null, fetchEvent(new ApiResponseError(error)))
        expect(eventState.errors).toEqual(errorMessages)
      })
    })
  })
})
