import moxios from 'moxios'
import client from '../client'
import Base from '../Base'
import * as endpoints from '../../constants/endpoints'
import eventParams from '../../factories/Event'

const base = new Base(endpoints.event)

const baseUrl = endpoints.event.all
const detailUrl = `${baseUrl}/1`

const events = [eventParams.event1, eventParams.event2]
const { event1 } = eventParams

describe('Base', () => {
  beforeEach(() => {
    expect.assertions(1)
    moxios.install(client)
  })

  afterEach(() => {
    moxios.uninstall()
  })

  describe('.all', () => {
    describe('on success', () => {
      it('should return all mock data.', () => {
        moxios.stubOnce('get', baseUrl, { status: 200, response: events })
        return base.all().then((res) => {
          expect(res).toEqual(events)
        })
      })
    })
  })

  describe('.create', () => {
    describe('on success', () => {
      it('should return created mock data.', () => {
        moxios.stubOnce('post', baseUrl, { status: 201, response: event1 })
        return base.create(event1).then((res) => {
          expect(res).toEqual(event1)
        })
      })
    })
    describe('on failure', () => {
      it('should return Error object with messages.', () => {
        moxios.stubOnce('post', baseUrl, {
          status: 422,
          response: { name: ['を入力してください', 'は８文字以上です'] },
        })
        return base.create(event1).catch((err) => {
          expect(err.errors).toEqual(['nameを入力してください', 'nameは８文字以上です'])
        })
      })
    })
  })

  describe('.find', () => {
    describe('on success', () => {
      it('should return find mock data.', () => {
        moxios.stubOnce('get', detailUrl, { status: 200, response: event1 })
        return base.find(event1).then((res) => {
          expect(res).toEqual(event1)
        })
      })
    })
    describe('on failure', () => {
      it('should return Error object with messages.', () => {
        moxios.stubOnce('get', detailUrl, { status: 404 })
        return base.find(event1).catch((err) => {
          expect(err.errors).toEqual(['Not Found'])
        })
      })
    })
  })

  describe('.update', () => {
    describe('on success', () => {
      it('should return update mock data.', () => {
        moxios.stubOnce('post', detailUrl, { status: 200, response: event1 })
        return base.update(event1).then((res) => {
          expect(res).toEqual(event1)
        })
      })
    })
    describe('on failure', () => {
      it('should return Error object with messages.', () => {
        moxios.stubOnce('post', detailUrl, {
          status: 422,
          response: { name: ['を入力してください', 'は８文字以上です'] },
        })
        return base.update(event1).catch((err) => {
          expect(err.errors).toEqual(['nameを入力してください', 'nameは８文字以上です'])
        })
      })
    })
  })

  describe('.delete', () => {
    describe('on success', () => {
      it('should return deleted mock data.', () => {
        moxios.stubOnce('delete', detailUrl, { status: 200, response: event1 })
        return base.delete(event1).then((res) => {
          expect(res).toEqual(event1)
        })
      })
    })
    describe('on failure', () => {
      it('should return Error object with messages.', () => {
        moxios.stubOnce('delete', detailUrl, { status: 404 })
        return base.delete(event1).catch((err) => {
          expect(err.errors).toEqual(['Not Found'])
        })
      })
    })
  })
})
