import { createAction } from 'redux-actions'
import { List } from 'immutable'

import ParticipantReducer, { participantInitialState } from '../participant'
import Actions from '../../constants/Actions'
import ApiResponseError from '../../api/ApiResponseError'
import EventParams from '../../factories/Event'
import ParticipantParams from '../../factories/Participant'
import ConvertCase from '../../utils/ConvertCase'

const initialState = participantInitialState
const participantParams1 = ParticipantParams.participant1
const participantParams2 = ParticipantParams.participant2
const participantEntity1 = { [participantParams1.id]: participantParams1 }
const participantEntity2 = { [participantParams2.id]: participantParams2 }

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
    const eventParams = {
      ...EventParams.event1,
      participants: [ConvertCase.snakeKeysOf(participantParams1)],
    }

    describe('with success event fetch', () => {
      it('should return participants in fetched event', () => {
        const subject = ParticipantReducer(initialState, fetchEvent(eventParams))
        expect(subject).toEqual(initialState.merge({ entities: participantEntity1 }))
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
        const prevState = initialState.merge({ entities: participantEntity1 })
        const subject = ParticipantReducer(
          prevState,
          registerForEvent(ConvertCase.snakeKeysOf(participantParams2)),
        )
        expect(subject).toEqual(prevState.mergeDeep({ entities: participantEntity2 }))
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
})
