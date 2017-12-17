import { Map, List } from 'immutable'
import * as EventSelector from '../event'
import EventParams from '../../factories/Event'

const eventId = EventParams.event1.id
const errorMessages = ['nameを入力して下さい', 'nameは１０文字以下です']

const testEventState = new Map({
  entityId: eventId,
  entities: new Map({ [eventId]: new Map().merge(EventParams.event1) }),
  errors: new List(errorMessages),
})
const mockState = { event: testEventState }

describe('EventSelector', () => {
  describe('getEventId', () => {
    it('returns event id from state.', () => {
      const subject = EventSelector.getEventId(mockState)
      expect(subject).toEqual(eventId)
    })
  })

  describe('getEventErrorsArray', () => {
    it('returns an array of error messages.', () => {
      const subject = EventSelector.getEventErrorsArray(mockState)
      expect(subject).toEqual(errorMessages)
    })
  })

  describe('getCurrentEvent', () => {
    it('returns event object pointed by entityId.', () => {
      const subject = EventSelector.getCurrentEvent(mockState)
      expect(subject).toEqual(EventParams.event1)
    })
  })
})
