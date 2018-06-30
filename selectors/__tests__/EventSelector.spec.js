import { Map, List } from 'immutable'
import * as EventSelector from '../event'
import EventParams from '../../factories/Event'

const eventId = EventParams.event1.id
const eventEntity = {
  ...EventParams.event1,
  eventStartsAt: '2018-03-01T09:00:00+09:00',
  eventEndsAt: '2018-03-01T17:00:00+09:00',
}
const errorMessages = ['nameを入力して下さい', 'nameは１０文字以下です']

const testEventState = new Map({
  entityId: eventId,
  entities: new Map({ [eventId]: new Map().merge(eventEntity) }),
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
      const result = {
        ...EventParams.event1,
        eventStartsAt: '2018年3月1日 木曜日 00:00',
        eventEndsAt: '2018年3月1日 木曜日 08:00',
      }

      expect(subject).toEqual(result)
    })
  })

  describe('getHasNotFoundError', () => {
    it('returns true when current event has 404 Error.', () => {
      const notFoundErrorMessage = ['Not Found']
      const notFoundErrorState = {
        event: testEventState.setIn(['errors'], new List(notFoundErrorMessage)),
      }
      const subject = EventSelector.getHasNotFoundError(notFoundErrorState)
      expect(subject).toEqual(true)
    })

    it('returns false when current event doesnt have 404 Error', () => {
      const subject = EventSelector.getHasNotFoundError(mockState)
      expect(subject).toEqual(false)
    })
  })

  describe('getHasWaitlist', () => {
    it('returns true when current event has a waitlist.', () => {
      const waitlistEvent = {
        ...EventParams.event1,
        quota: 2,
        participants: [1, 2],
      }
      const waitlistState = {
        event: testEventState.setIn(['entities'], new Map({ [eventId]: new Map().merge(waitlistEvent) })),
      }
      const subject = EventSelector.getHasWaitlist(waitlistState)
      expect(subject).toEqual(true)
    })

    it('returns false when current event has no waitlist.', () => {
      const noWaitlistEvent = {
        ...EventParams.event1,
        quota: 2,
        participants: [1],
      }
      const noWaitlistState = {
        event: testEventState.setIn(['entities'], new Map({ [eventId]: new Map().merge(noWaitlistEvent) })),
      }

      const subject = EventSelector.getHasWaitlist(noWaitlistState)
      expect(subject).toEqual(false)
    })
  })

  describe('getUserParticipation', () => {
    it('returns userParticipation object of current event.', () => {
      const subject = EventSelector.getUserParticipation(mockState)
      const result = EventParams.event1.userParticipation

      expect(subject).toEqual(result)
    })
  })
})
