import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Router from 'next/router'
import * as Actions from '../index'
import ActionsType from '../../../constants/Actions'

// Creating Nextjs Router instance manually for test.
class MockedRouter {
  constructor() { this.pathname = null }
  replace(pathname) { this.pathname = pathname }
}

Router.router = new MockedRouter()

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
let store = Object.create(null)

// TODO: Refactor this mocked function after API implemented.
// Mocking EventAPI with virtual mode, because API is not implemanted yet.
jest.mock('../../../api/Event', () => ({
  create: success => (success ? Promise.resolve({ id: 1 }) : Promise.reject(new Error())),
}), { virtual: true })

describe('EventAction', () => {
  describe('createEvent', () => {
    beforeEach(() => {
      store = mockStore({})
    })

    describe('when successes to create the Event', () => {
      it('returns create action with event data.', async () => {
        expect.assertions(2)
        const action = await store.dispatch(Actions.createEvent(true))
        expect(action.type).toBe(ActionsType.Event.createEvent)
        expect(action.payload).toEqual({ id: 1 })
      })
      it('replace pathname of Nextjs Router to event show page.', async () => {
        expect.assertions(1)
        await store.dispatch(Actions.createEvent(true))
        expect(Router.router.pathname).toEqual('/event/1')
      })
    })

    describe('when fails to create the Event', () => {
      it('returns create action with instance of Error.', async () => {
        expect.assertions(2)
        const action = await store.dispatch(Actions.createEvent(false))
        expect(action.type).toBe(ActionsType.Event.createEvent)
        expect(action.payload).toBeInstanceOf(Error)
      })
    })
  })
})
