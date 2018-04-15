import { createAction } from 'redux-actions'
import { Map, List } from 'immutable'

import ParticipantReducer, { participantInitialState } from '../participant'
import Actions from '../../constants/Actions'
import Messages from '../../constants/Messages'
import ApiResponseError from '../../api/ApiResponseError'

import ParticipantParams from '../../factories/Participant'

const { participant1, participant2 } = ParticipantParams

const participantPayload = participant => ({
  result: participant.id,
  entities: { participant: { [participant.id]: participant } },
  errors: [],
})

const error = { response: { data: { name: ['を入力して下さい', 'は１０文字以下です'] } } }
const errorMessages = new List(['nameを入力して下さい', 'nameは１０文字以下です'])

describe('Participant Reducer', () => {
  describe('when initial state', () => {
    it('should return the initial state', () => {
      expect(ParticipantReducer(undefined, { type: '@@INIT' })).toEqual(participantInitialState)
    })
  })

  describe('when FETCH_EVENT action', () => {
    const fetchEvent = createAction(Actions.Event.fetchEvent)

    describe('with success event fetch', () => {
      it('should return participants in fetched event', () => {
        const expectedState = new Map({
          entities: new Map({
            [participant1.id]: new Map({ ...participant1 }),
          }),
          errors: new List(),
          message: null,
        })
        const payload = participantPayload(participant1)
        const subject = ParticipantReducer(participantInitialState, fetchEvent(payload))

        expect(subject).toEqual(expectedState)
      })
    })

    describe('with failure event fetch', () => {
      it('should keep state', () => {
        const subject =
          ParticipantReducer(participantInitialState, fetchEvent(new ApiResponseError(error)))
        expect(subject).toEqual(participantInitialState)
      })
    })
  })

  describe('when REGISTER_FOR_EVENT action', () => {
    const registerForEvent = createAction(Actions.Event.registerForEvent)


    describe('with success registeration for event', () => {
      describe('with onWaitingList false', () => {
        it('should add regitered participant with the admitted message.', () => {
          const payload = participantPayload({ ...participant1, onWaitingList: false })
          const subject = ParticipantReducer(participantInitialState, registerForEvent(payload))

          const expectedState = new Map({
            entities: new Map({
              [participant1.id]: new Map({ ...participant1, onWaitingList: false }),
            }),
            errors: new List(),
            message: Messages.Participants.admittedRegestration,
          })

          expect(subject).toEqual(expectedState)
        })
      })

      describe('with onWaitingList true.', () => {
        it('should add regitered participant with the waitlisted message.', () => {
          const payload = participantPayload({ ...participant1, onWaitingList: true })
          const subject = ParticipantReducer(participantInitialState, registerForEvent(payload))

          const expectedState = new Map({
            entities: new Map({
              [participant1.id]: new Map({ ...participant1, onWaitingList: true }),
            }),
            errors: new List(),
            message: Messages.Participants.waitlistedRegestration,
          })

          expect(subject).toEqual(expectedState)
        })
      })
    })

    describe('with failure event register', () => {
      it('should return error message', () => {
        const subject =
          ParticipantReducer(participantInitialState, registerForEvent(new ApiResponseError(error)))
        expect(subject.get('errors')).toEqual(errorMessages)
      })
    })
  })

  describe('when CANCEL_REGISTRATION action', () => {
    const cancelRegistration = createAction(Actions.Event.cancelRegistration)

    describe('with success cancel registration', () => {
      it('should return participants in canceled event', () => {
        const prevState = new Map({
          entities: new Map({
            [participant1.id]: new Map({ ...participant1 }),
            [participant2.id]: new Map({ ...participant2 }),
          }),
          errors: new List(),
          message: null,
        })
        const payload = participantPayload(participant1)
        const subject = ParticipantReducer(prevState, cancelRegistration(payload))

        const expectedState = prevState.deleteIn(['entities', `${participant2.id}`])

        expect(subject).toEqual(expectedState)
      })
    })

    describe('with failure cancel registration', () => {
      it('should return error message', () => {
        const subject = ParticipantReducer(
          participantInitialState,
          cancelRegistration(new ApiResponseError(error)),
        )
        expect(subject.get('errors')).toEqual(errorMessages)
      })
    })
  })
})
