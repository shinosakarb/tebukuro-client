import { Map, List } from 'immutable'
import * as ParticipantSelector from '../participant'

const errorMessages = ['nameを入力して下さい', 'nameは１０文字以下です']

const testParticipantState = new Map({
  errors: new List(errorMessages),
})
const mockState = { participant: testParticipantState }

describe('ParticipantSelector', () => {
  describe('getParticipantErrorsArray', () => {
    it('returns an array of error messages.', () => {
      const subject = ParticipantSelector.getParticipantErrorsArray(mockState)
      expect(subject).toEqual(errorMessages)
    })
  })
})
