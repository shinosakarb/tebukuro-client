import { Map, List } from 'immutable'
import * as EventFormSelector from '../eventForm'

const nameErrorMessages = ['nameは必須です。']
const quotaErrorMessages = []

const testEventFormState = new Map({
  name: new Map({
    validationPassed: false,
    errors: new List(nameErrorMessages),
  }),
  quota: new Map({
    validationPassed: true,
    errors: new List(quotaErrorMessages),
  }),
})
const mockState = { eventForm: testEventFormState }

describe('EventFormSelector', () => {
  describe('getValidationErrorMessages', () => {
    it('returns validation error messages from state.', () => {
      const subject = EventFormSelector.getValidationErrorMessages(mockState)
      expect(subject).toEqual({
        name: nameErrorMessages,
        quota: quotaErrorMessages,
      })
    })
  })

  describe('isValidationFailed', () => {
    describe('when one of the filed validations failed', () => {
      it('returns true.', () => {
        const subject = EventFormSelector.isValidationFailed(mockState)
        expect(subject).toEqual(true)
      })
    })

    describe('when all of the field validations success', () => {
      const successState = {
        eventForm: testEventFormState.merge({
          name: {
            validationPassed: true,
            errors: [],
          },
        }),
      }

      it('returns false.', () => {
        const subject = EventFormSelector.isValidationFailed(successState)
        expect(subject).toEqual(false)
      })
    })
  })
})
