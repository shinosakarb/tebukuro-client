import eventFormValidator from '../eventFormValidator'

const id = 'name'
const value = { name: 'event1' }

const passedResult = {
  id,
  validationPassed: true,
  errors: [],
}

const failedResult = {
  id,
  validationPassed: false,
  errors: ['nameは必須です。'],
}

const excludedResult = {
  ...passedResult,
  id: 'description',
}

describe('EventFormValidator', () => {
  describe('with valid params', () => {
    const result = eventFormValidator(id, value)
    it('returns passed result.', () => {
      expect(result).toEqual(passedResult)
    })
  })

  describe('with invalid params', () => {
    const result = eventFormValidator(id, '')
    it('returns failed result.', () => {
      expect(result).toEqual(failedResult)
    })
  })

  describe('with id excluded from validation', () => {
    const result = eventFormValidator(excludedResult.id, '')
    it('returns passed result.', () => {
      expect(result).toEqual(excludedResult)
    })
  })
})
