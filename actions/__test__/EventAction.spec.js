import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import Router from 'next/router'
import * as Actions from '../event'
import ActionsType from '../../constants/Actions'

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

// TODO: Refactor this mocked function after API implemented.
jest.mock('../../api/Event', () => ({
  create: success => (
    success ? Promise.resolve({ id: 1 }) : Promise.reject(new Error())
  ),
  find: success => (
    success ? Promise.resolve({ id: 1 }) : Promise.reject(new Error())
  ),
  // Mocking EventAPI with virtual mode, because API is not implemanted yet.
}), { virtual: true })

describe('EventAction', () => {
  beforeEach(() => {
    store = mockStore({ event: { id: 1 } })
  })

  describe('createEvent', () => {
    beforeEach(() => {
      Router.router = new MockedRouter(newEventPath)
    })

    describe('when successes to create the Event', () => {
      it('returns create action with event data.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.createEvent(true))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.createEvent)
            expect(action.payload).toEqual({ id: 1 })
          })
      })

      it('replace Nextjs routing to event show page.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.createEvent(true))
          .then(() => {
            expect(Router.router.path).toEqual(showEventPath)
            expect(Router.router.asPath).toEqual(showEventAsPath)
          })
      })
    })

    describe('when fails to create the Event', () => {
      it('returns create action with instance of Error.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.createEvent(false))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.createEvent)
            expect(action.payload).toBeInstanceOf(Error)
          })
      })

      it('keep Nextjs routing path.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.createEvent(false))
          .then(() => {
            expect(Router.router.path).toEqual(newEventPath)
            expect(Router.router.asPath).toEqual(null)
          })
      })
    })
  })

  describe('fetchEvent', () => {
    describe('when successes to fetch the Event', () => {
      it('returns fetch action with event data.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.fetchEvent(true))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.fetchEvent)
            expect(action.payload).toEqual({ id: 1 })
          })
      })
    })

    describe('when fails to fetch the Event', () => {
      it('returns fetch action with instance of Error.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.fetchEvent(false))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.fetchEvent)
            expect(action.payload).toBeInstanceOf(Error)
          })
      })
    })
  })
})
