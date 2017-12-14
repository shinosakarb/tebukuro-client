import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import Router from 'next/router'
import { Map } from 'immutable'
import * as Actions from '../event'
import ActionsType from '../../constants/Actions'
import EventSchema from '../../schemas/event'
import ParticipantSchema from '../../schemas/participant'

jest.mock('../../api/index')
/* eslint-disable import/first */
import mockAPI from '../../api/index'
/* eslint-enable */

const testParam = new Map({ entityId: 1 })

const middlewares = [promiseMiddleware, thunk]
const mockStore = configureStore(middlewares)
let store = Object.create(null)

// Create a mocked router for Nextjs Router instance.
const newEventPath = '/event/new'
const showEventPath = '/event/show?id=1'
const showEventAsPath = '/event/1'

class MockedRouter {
  constructor(path) {
    this.path = path
    this.asPath = null
  }

  replace(path, asPath) {
    this.path = path
    this.asPath = asPath
  }
}

describe('EventAction', () => {
  beforeEach(() => {
    store = mockStore({ event: testParam })
  })

  describe('createEvent', () => {
    beforeEach(() => {
      Router.router = new MockedRouter(newEventPath)
    })

    describe('when successes to create the Event', () => {
      beforeEach(() => {
        /* eslint-disable no-underscore-dangle */
        mockAPI.__setMockResult(true)
        /* eslint-enable */
      })
      it('returns create action with event data.', () => {
        expect.assertions(3)
        return store.dispatch(Actions.createEvent(testParam))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.createEvent)
            expect(action.payload).toEqual(testParam)
            expect(action.meta.normalizr.schema).toEqual(EventSchema)
          })
      })

      it('replace Nextjs routing to event show page.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.createEvent(testParam))
          .then(() => {
            expect(Router.router.path).toEqual(showEventPath)
            expect(Router.router.asPath).toEqual(showEventAsPath)
          })
      })
    })

    describe('when fails to create the Event', () => {
      beforeEach(() => {
        /* eslint-disable no-underscore-dangle */
        mockAPI.__setMockResult(false)
        /* eslint-enable */
      })
      it('returns create action with instance of Error.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.createEvent(testParam))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.createEvent)
            expect(action.payload).toBeInstanceOf(Error)
          })
      })

      it('keep Nextjs routing path.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.createEvent(testParam))
          .then(() => {
            expect(Router.router.path).toEqual(newEventPath)
            expect(Router.router.asPath).toEqual(null)
          })
      })
    })
  })

  describe('fetchEvent', () => {
    describe('when successes to fetch the Event', () => {
      beforeEach(() => {
        /* eslint-disable no-underscore-dangle */
        mockAPI.__setMockResult(true)
        /* eslint-enable */
      })
      it('returns fetch action with event data.', () => {
        expect.assertions(3)
        return store.dispatch(Actions.fetchEvent(testParam))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.fetchEvent)
            expect(action.payload).toEqual(testParam)
            expect(action.meta.normalizr.schema).toEqual(EventSchema)
          })
      })
    })

    describe('when fails to fetch the Event', () => {
      beforeEach(() => {
        /* eslint-disable no-underscore-dangle */
        mockAPI.__setMockResult(false)
        /* eslint-enable */
      })
      it('returns fetch action with instance of Error.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.fetchEvent(testParam))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.fetchEvent)
            expect(action.payload).toBeInstanceOf(Error)
          })
      })
    })
  })

  describe('registerForEvent', () => {
    describe('when successes to join the Event', () => {
      beforeEach(() => {
        /* eslint-disable no-underscore-dangle */
        mockAPI.__setMockResult(true)
        /* eslint-enable */
      })
      it('returns join action with participant data.', () => {
        expect.assertions(3)
        return store.dispatch(Actions.registerForEvent(testParam))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.registerForEvent)
            expect(action.payload).toEqual(testParam)
            expect(action.meta.normalizr.schema).toEqual(ParticipantSchema)
          })
      })
    })

    describe('when fails to join the Event', () => {
      beforeEach(() => {
        /* eslint-disable no-underscore-dangle */
        mockAPI.__setMockResult(false)
        /* eslint-enable */
      })
      it('returns join action with instance of Error.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.registerForEvent(testParam))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.registerForEvent)
            expect(action.payload).toBeInstanceOf(Error)
          })
      })
    })
  })
})
