import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import Router from 'next/router'
import { normalize } from 'normalizr'

import * as Actions from '../event'
import ActionsType from '../../constants/Actions'

import EventParams from '../../factories/Event'
import ParticipantParams from '../../factories/Participant'

import EventSchema from '../../schemas/event'
import ParticipantSchema from '../../schemas/participant'

jest.mock('../../api/index')
// eslint-disable-next-line import/first
import mockAPI from '../../api/index'

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
    store = mockStore({ event: { id: 1 } })
  })

  describe('createEvent', () => {
    beforeEach(() => {
      Router.router = new MockedRouter(newEventPath)
    })

    const testParam = { ...EventParams.event1, participants: [] }
    const result = normalize(testParam, EventSchema)

    describe('when successes to create the Event', () => {
      beforeEach(() => {
        // eslint-disable-next-line no-underscore-dangle
        mockAPI.__setMockResult(true)
      })
      it('returns create action with event data.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.createEvent(testParam))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.createEvent)
            expect(action.payload).toEqual(result)
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
        // eslint-disable-next-line no-underscore-dangle
        mockAPI.__setMockResult(false)
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
    const testParam = {
      ...EventParams.event1,
      participants: Object.values(ParticipantParams),
    }
    const result = normalize(testParam, EventSchema)

    describe('when successes to fetch the Event', () => {
      beforeEach(() => {
        // eslint-disable-next-line no-underscore-dangle
        mockAPI.__setMockResult(true)
      })
      it('returns fetch action with event data.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.fetchEvent(testParam))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.fetchEvent)
            expect(action.payload).toEqual(result)
          })
      })
    })

    describe('when fails to fetch the Event', () => {
      beforeEach(() => {
        // eslint-disable-next-line no-underscore-dangle
        mockAPI.__setMockResult(false)
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
    const testParam = ParticipantParams.participant1
    const result = normalize(testParam, ParticipantSchema)

    describe('when successes to join the Event', () => {
      beforeEach(() => {
        // eslint-disable-next-line no-underscore-dangle
        mockAPI.__setMockResult(true)
      })
      it('returns join action with participant data.', () => {
        expect.assertions(2)
        return store.dispatch(Actions.registerForEvent(testParam))
          .then(() => {
            const action = store.getActions()[0]
            expect(action.type).toBe(ActionsType.Event.registerForEvent)
            expect(action.payload).toEqual(result)
          })
      })
    })

    describe('when fails to join the Event', () => {
      beforeEach(() => {
        // eslint-disable-next-line no-underscore-dangle
        mockAPI.__setMockResult(false)
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
