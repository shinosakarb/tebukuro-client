import { validateEventForm } from '../eventForm'
import ActionsType from '../../constants/Actions'

const testParams = {
  id: 'name',
  value: '',
}

describe('EventFormAction', () => {
  describe('validateEventForm', () => {
    it('returns validate action with validation result.', () => {
      const action = validateEventForm(testParams.id, testParams.value)
      const { type, payload } = action

      expect(type).toEqual(ActionsType.EventForm.validateEventParam)
      expect(payload.id).toEqual(testParams.id)
      expect(payload.validationPassed).toEqual(false)
      expect(payload.errors).toEqual(['nameは必須です。'])
    })
  })
})
