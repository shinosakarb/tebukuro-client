import moxios from 'moxios'
import moment from 'moment-timezone'
import client from '../client'
import Event from '../Event'
import * as endpoints from '../../constants/endpoints'
import eventParams from '../../factories/Event'
import '../../env-config'

const event = new Event(endpoints.event)

// Removing extra '/' from endpoint
const baseUrl = process.env.BASE_URL + endpoints.event.all.substring(1)
const registrationUrl = `${baseUrl}/1/registrations`

const { event1 } = eventParams

jest.mock('../../utils/auth')

describe('Event', () => {
  beforeEach(() => {
    expect.assertions(1)
    moxios.install(client)
  })

  afterEach(() => {
    moxios.uninstall()
  })

  describe('.registerForEvent', () => {
    describe('on success', () => {
      const participant = { id: 10 }

      it('should return  mock data.', () => {
        expect.assertions(1)
        moxios.stubOnce('post', registrationUrl, { status: 200, response: participant })
        return event.registerForEvent({ id: 1 }).then((res) => {
          expect(res).toEqual(participant)
        })
      })
    })
    describe('on failure', () => {
      const errorResponse = { eventId: ['への参加登録に失敗しました'] }
      const errorMessages = ['eventIdへの参加登録に失敗しました']

      it('should return Error object with messages.', () => {
        expect.assertions(1)
        moxios.stubOnce('post', registrationUrl, { status: 422, response: errorResponse })
        return event.registerForEvent({ id: 1 }).catch((err) => {
          expect(err.errors).toEqual(errorMessages)
        })
      })
    })
  })

  describe('.cancelRegistration', () => {
    describe('on success', () => {
      it('should return canceled mock data.', () => {
        expect.assertions(1)
        moxios.stubOnce('delete', registrationUrl, { status: 200, response: event1 })
        return event.cancelRegistration(event1).then((res) => {
          expect(res).toEqual(event1)
        })
      })
    })
    describe('on failure', () => {
      it('should return Error object with messages.', () => {
        expect.assertions(1)
        moxios.stubOnce('delete', registrationUrl, { status: 404 })
        return event.cancelRegistration(event1).catch((err) => {
          expect(err.errors).toEqual(['Not Found'])
        })
      })
    })
  })

  describe('.createEvent', () => {
    describe('on success', () => {
      beforeEach(() => {
        moxios.stubOnce('post', baseUrl, { status: 200, response: event1 })
        expect.assertions(1)
      })

      afterEach(() => {
        moment.tz.setDefault()
      })

      describe('on UTC timezone', () => {
        it('should send request with ISO8601 formatted parameter.', () => {
          moment.tz.setDefault('UTC')
          const params = {
            ...event1,
            eventStartsAt: '2018-03-01T09:00:00',
            eventEndsAt: '2018-03-01T17:00:00',
          }

          return event.createEvent(params).then(() => {
            const requestParams = moxios.requests.mostRecent().config.data
            // should no offset
            expect(JSON.parse(requestParams)).toEqual(expect.objectContaining({
              event_starts_at: '2018-03-01T09:00:00.000Z',
              event_ends_at: '2018-03-01T17:00:00.000Z',
            }))
          })
        })
      })

      describe('on JST timezone', () => {
        it('should send request with ISO8601 formatted parameter.', () => {
          moment.tz.setDefault('Asia/Tokyo')
          const params = {
            ...event1,
            eventStartsAt: '2018-03-01T09:00:00',
            eventEndsAt: '2018-03-01T17:00:00',
          }

          return event.createEvent(params).then(() => {
            const requestParams = moxios.requests.mostRecent().config.data
            // should -9 hours as offset of Asia/Tokyo timezone
            expect(JSON.parse(requestParams)).toEqual(expect.objectContaining({
              event_starts_at: '2018-03-01T00:00:00.000Z',
              event_ends_at: '2018-03-01T08:00:00.000Z',
            }))
          })
        })
      })

      it('should return created Event mock data.', () => (
        event.createEvent(event1).then((res) => {
          expect(res).toEqual(event1)
        })))
    })

    describe('on failure', () => {
      const errorResponse = { name: ['を入力して下さい', 'は１０文字以下です'] }
      const errorMessages = ['nameを入力して下さい', 'nameは１０文字以下です']

      it('should return Error object with messages.', () => {
        expect.assertions(1)
        moxios.stubOnce('post', baseUrl, { status: 422, response: errorResponse })
        return event.createEvent(event1).catch((err) => {
          expect(err.errors).toEqual(errorMessages)
        })
      })
    })
  })
})
