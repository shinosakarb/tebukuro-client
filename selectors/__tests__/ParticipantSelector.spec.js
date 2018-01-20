import { Map, List } from 'immutable'
import * as ParticipantSelector from '../participant'
import ParticipantParams from '../../factories/Participant'

const errorMessages = ['nameを入力して下さい', 'nameは１０文字以下です']
const completeMessage = '参加登録が完了しました。'

const { participant1, participant2 } = ParticipantParams

const testParticipantState = new Map({
  entities: new Map({
    [participant1.id]: new Map(participant1),
    [participant2.id]: new Map(participant2),
  }),
  errors: new List(errorMessages),
  message: completeMessage,
})
const mockState = { participant: testParticipantState }

describe('ParticipantSelector', () => {
  describe('getParticipantsArray', () => {
    it('returns an array of participants.', () => {
      const subject = ParticipantSelector.getParticipants(mockState)
      expect(subject).toEqual(Object.values(ParticipantParams))
    })
  })

  describe('getParticipantErrorsArray', () => {
    it('returns an array of error messages.', () => {
      const subject = ParticipantSelector.getParticipantErrorsArray(mockState)
      expect(subject).toEqual(errorMessages)
    })
  })
  describe('getParticipantMessage', () => {
    it('returns the message for the result.', () => {
      const subject = ParticipantSelector.getParticipantMessage(mockState)
      expect(subject).toEqual(completeMessage)
    })
  })
})
