import { createAction } from 'redux-actions'
import { Map, List } from 'immutable'
import { normalize } from 'normalizr'

import ParticipantReducer, { participantInitialState } from '../participant'
import Actions from '../../constants/Actions'
import Messages from '../../constants/Messages'
import ApiResponseError from '../../api/ApiResponseError'
import ConvertCase from '../../utils/ConvertCase'

import EventParams from '../../factories/Event'
import ParticipantParams from '../../factories/Participant'

import EventSchema from '../../schemas/event'
import ParticipantSchema from '../../schemas/participant'

const { participant1, participant2 } = ParticipantParams
const admittedParticipant = { ...participant1, onWaitingList: false }
const waitlistedParticipant = { ...participant2, onWaitingList: true }
const admittedParticipantEntity = { [admittedParticipant.id]: new Map(admittedParticipant) }
const waitlistedParticipantEntity = { [waitlistedParticipant.id]: new Map(waitlistedParticipant) }

const initialState = participantInitialState
const participantMergedState = initialState.merge({ entities: admittedParticipantEntity })

const { admittedRegestration, waitlistedRegestration } = Messages.Participants
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
          participants: [ConvertCase.snakeKeysOf(admittedParticipant)],
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

    const reducedParticipant = (participant) => {
      const normalizedPayload = normalize(ConvertCase.snakeKeysOf(participant), ParticipantSchema)
      return ParticipantReducer(initialState, registerForEvent(normalizedPayload))
    }

    describe('with success registeration for event', () => {
      describe('with onWaitingList true', () => {
        it('should add regitered participant with the admitted message.', () => {
          const subject = reducedParticipant(admittedParticipant)
          const nextState = initialState.mergeDeep({
            entities: admittedParticipantEntity,
            message: admittedRegestration,
          })
          expect(subject).toEqual(nextState)
        })
      })

      describe('with onWaitingList false.', () => {
        it('should add regitered participant with the waitlisted message.', () => {
          const subject = reducedParticipant(waitlistedParticipant)
          const nextState = initialState.mergeDeep({
            entities: waitlistedParticipantEntity,
            message: waitlistedRegestration,
          })
          expect(subject).toEqual(nextState)
        })
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
      it('should return participants in canceled event', () => {
        const eventParams = {
          ...EventParams.event1,
          participants: [ConvertCase.snakeKeysOf(admittedParticipant)],
        }
        const normalizedEvent = normalize(eventParams, EventSchema)
        const subject = ParticipantReducer(initialState, cancelRegistration(normalizedEvent))

        expect(subject).toEqual(participantMergedState)
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
