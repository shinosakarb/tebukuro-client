import moxios from 'moxios'
import client from '../client'
import Event from '../Event'
import * as endpoints from '../../constants/endpoints'
import eventParams from '../../factories/Event'
import '../../env-config'

const event = new Event(endpoints.event)

// Removing extra '/' from endpoint
const baseUrl = process.env.BASE_URL + endpoints.event.all.substring(1)
const cancelUrl = `${baseUrl}/1/registrations`

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

  describe('.cancelRegistration', () => {
    describe('on success', () => {
      it('should return canceled mock data.', () => {
        expect.assertions(1)
        moxios.stubOnce('delete', cancelUrl, { status: 200, response: event1 })
        return event.cancelRegistration(event1).then((res) => {
          expect(res).toEqual(event1)
        })
      })
    })
    describe('on failure', () => {
      it('should return Error object with messages.', () => {
        expect.assertions(1)
        moxios.stubOnce('delete', cancelUrl, { status: 404 })
        return event.cancelRegistration(event1).catch((err) => {
          expect(err.errors).toEqual(['Not Found'])
        })
      })
    })
  })
})
