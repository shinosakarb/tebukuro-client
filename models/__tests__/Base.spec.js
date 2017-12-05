import Base from '../Base'

const subjectClass = (params) => {
  const Klass = Base(params)
  return new Klass()
}

describe('Base', () => {
  describe('isError', () => {
    describe('when error is not empty', () => {
      it('should return true', () => {
        const subject = subjectClass({ errors: ['error'] })
        expect(subject.isError()).toBe(true)
      })
    })

    describe('when error is empty', () => {
      it('should return false', () => {
        const subject = subjectClass({ errors: [] })
        expect(subject.isError()).toBe(false)
      })
    })
  })
})
