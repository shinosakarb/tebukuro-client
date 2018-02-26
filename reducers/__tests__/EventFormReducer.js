import { createAction } from 'redux-actions'

import EventFormReducer, { eventFormInitialState } from '../eventForm'
import Actions from '../../constants/Actions'

const testParams = {
  id: 'name',
  validationPassed: false,
  errors: ['nameは必須です。'],
}

describe('EventFormReducer', () => {
  describe('when initial state', () => {
    it('should return the initial state', () => {
      expect(EventFormReducer(undefined, {})).toEqual(eventFormInitialState)
    })
  })

  describe('when VALIDATE_EVENT_FORM action', () => {
    it('should return validated event form state.', () => {
      const validateEventForm = createAction(Actions.EventForm.validateEventParam)
      const subject = EventFormReducer(eventFormInitialState, validateEventForm(testParams))

      const nextState = eventFormInitialState.merge({
        [testParams.id]: {
          validationPassed: testParams.validationPassed,
          errors: testParams.errors,
        },
      })

      expect(subject).toEqual(nextState)
    })
  })
})
