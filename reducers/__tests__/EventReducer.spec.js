import { createAction } from 'redux-actions'
import { Set } from 'immutable'

import EventReducer, { eventInitialState } from '../event'
import Actions from '../../constants/Actions'
import ApiResponseError from '../../api/ApiResponseError'
import ConvertCase from '../../utils/ConvertCase'

import EventModel from '../../models/Event'
import ParticipantModel from '../../models/Participant'

import EventParams from '../../factories/Event'
import ParticipantParams from '../../factories/Participant'


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
        expect(eventState).toEqual(new EventModel(EventParams.event1))
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
        expect(eventState).toEqual(new EventModel(EventParams.event1))
      })
    })

    describe('with failure event fetch', () => {
      it('should return error message', () => {
        const eventState = EventReducer(null, fetchEvent(new ApiResponseError(error)))
        expect(eventState.errors).toEqual(errorMessages)
      })
    })
  })

  describe('when JOIN_EVENT action', () => {
    const joinEvent = createAction(Actions.Event.joinEvent)

    const participant = ParticipantParams.participant1
    const receivedData = ConvertCase.snakeKeysOf(participant)

    const prevState = new EventModel({
      ...EventParams.event1,
      errors: ['Error'],
    })
    const nextState = new EventModel({
      ...EventParams.event1,
      participants: Set.of(new ParticipantModel(participant)),
    })

    describe('with success event join', () => {
      it('should return joined event', () => {
        const eventState = EventReducer(prevState, joinEvent(receivedData))
        expect(eventState).toEqual(nextState)
      })
    })

    describe('with failure event join', () => {
      it('should return error message', () => {
        const eventState = EventReducer(prevState, joinEvent(new ApiResponseError(error)))
        expect(eventState).toEqual(prevState.set('errors', errorMessages))
      })
    })
  })
})
