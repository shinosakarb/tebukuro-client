import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import Router from 'next/router'
import * as Actions from '../event'
import ActionsType from '../../constants/Actions'

const middlewares = [promiseMiddleware, thunk]
const mockStore = configureStore(middlewares)
let store = Object.create(null)

class MockedRouter {
  constructor() { this.pathname = null }
  replace(pathname) { this.pathname = pathname }
}

Router.router = new MockedRouter()

// TODO: Refactor this mocked function after API implemented.
// Mocking EventAPI with virtual mode, because API is not implemanted yet.
jest.mock('../../api/Event', () => ({
  create: success => (success ? Promise.resolve({ id: 1 }) : Promise.reject(new Error())),
}), { virtual: true })

describe('EventAction', () => {
  describe('createEvent', () => {
    beforeEach(() => {
      store = mockStore({ event: { id: 1 } })
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
        expect.assertions(1)
        return store.dispatch(Actions.createEvent(true))
          .then(() => {
            expect(Router.router.pathname).toEqual('/event/1')
          })
      })
    })

    describe('when fails to create the Event', () => {
      it('returns create action with instance of Error.', async () => {
        expect.assertions(2)
        return store.dispatch(Actions.createEvent(false))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.createEvent)
            expect(action.payload).toBeInstanceOf(Error)
          })
      })
    })
  })
})
