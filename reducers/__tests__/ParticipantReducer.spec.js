import { createAction } from 'redux-actions'
import { Map, List } from 'immutable'
import { normalize } from 'normalizr'

import ParticipantReducer, { participantInitialState } from '../participant'
import Actions from '../../constants/Actions'
import ApiResponseError from '../../api/ApiResponseError'
import ConvertCase from '../../utils/ConvertCase'

import EventParams from '../../factories/Event'
import ParticipantParams from '../../factories/Participant'

import EventSchema from '../../schemas/event'
import ParticipantSchema from '../../schemas/participant'

const { participant1, participant2 } = ParticipantParams
const participantEntity1 = { [participant1.id]: new Map(participant1) }
const participantEntity2 = { [participant2.id]: new Map(participant2) }

const initialState = participantInitialState
const participantMergedState = initialState.merge({ entities: participantEntity1 })

const error = {
  response: { data: { name: ['を入力して下さい', 'は１０文字以下です'] } },
}
const errorMessages = new List(['nameを入力して下さい', 'nameは１０文字以下です'])

describe('Participant Reducer', () => {
  describe('when initial state', () => {
    it('should return the initial state', () => {
      expect(ParticipantReducer(undefined, {})).toEqual(initialState)
    })
  })

  describe('when FETCH_EVENT action', () => {
    const fetchEvent = createAction(Actions.Event.fetchEvent)

    describe('with success event fetch', () => {
      it('should return participants in fetched event', () => {
        const eventParams = {
          ...EventParams.event1,
          participants: [ConvertCase.snakeKeysOf(participant1)],
        }
        const normalizedEvent = normalize(eventParams, EventSchema)
        const subject = ParticipantReducer(initialState, fetchEvent(normalizedEvent))

        expect(subject).toEqual(participantMergedState)
      })
    })

    describe('with failure event fetch', () => {
      it('should keep state', () => {
        const subject =
          ParticipantReducer(initialState, fetchEvent(new ApiResponseError(error)))
        expect(subject).toEqual(initialState)
      })
    })
  })

  describe('when REGISTER_FOR_EVENT action', () => {
    const registerForEvent = createAction(Actions.Event.registerForEvent)

    describe('with success event registerFor', () => {
      it('should add regitered participant', () => {
        const participantParams = ConvertCase.snakeKeysOf(participant2)
        const normalizedParticipant = normalize(participantParams, ParticipantSchema)
        const subject = ParticipantReducer(
          participantMergedState,
          registerForEvent(normalizedParticipant),
        )
        const nextState = participantMergedState.mergeDeep({ entities: participantEntity2 })

        expect(subject).toEqual(nextState)
      })
    })

    describe('with failure event register', () => {
      it('should return error message', () => {
        const subject =
          ParticipantReducer(initialState, registerForEvent(new ApiResponseError(error)))
        expect(subject.get('errors')).toEqual(errorMessages)
      })
    })
  })

  describe('when CANCEL_REGISTRATION action', () => {
    const cancelRegistration = createAction(Actions.Event.cancelRegistration)

    describe('with success cancel registration', () => {
      it('should delete registered participant', () => {
        const participantParams = ConvertCase.snakeKeysOf(participant2)
        const prevState = participantMergedState.mergeDeep({ entities: participantEntity2 })
        const subject = ParticipantReducer(
          prevState,
          cancelRegistration(participantParams),
        )
        const nextState = participantMergedState

        expect(subject).toEqual(nextState)
      })
    })

    describe('with failure cancel registration', () => {
      it('should return error message', () => {
        const subject =
          ParticipantReducer(initialState, cancelRegistration(new ApiResponseError(error)))
        expect(subject.get('errors')).toEqual(errorMessages)
      })
    })
  })
})
