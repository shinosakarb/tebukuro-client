import { normalize, schema } from 'normalizr'
import normalizeMiddleware from '../normalize'

const create = () => {
  const store = {}
  const next = jest.fn()
  const invoke = action => normalizeMiddleware(store)(next)(action)
  return { store, next, invoke }
}
const userSchema = new schema.Entity('users')
const user = { id: 1, name: 'user' }

describe('normalizeMiddleware', () => {
  it('normalizes', () => {
    const { next, invoke } = create()
    const action = {
      type: 'FETCH',
      payload: user,
      meta: {
        normalizr: { schema: userSchema },
      },
    }
    invoke(action)

    expect(next).toHaveBeenCalledWith({
      ...action,
      payload: normalize(user, userSchema),
    })
  })

  it('does not normalize when error reponse', () => {
    const { next, invoke } = create()
    const action = {
      type: 'FETCH',
      payload: ['error'],
      error: true,
      meta: {
        normalizr: { schema: userSchema },
      },
    }
    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
  })

  it('does not normalize when no meta option', () => {
    const { next, invoke } = create()
    const action = {
      type: 'FETCH',
      payload: user,
    }
    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
  })

  it('does not normalize when payload is a promise object', () => {
    const { next, invoke } = create()
    const action = {
      type: 'FETCH',
      payload: Promise.resolve(),
      meta: {
        normalizr: { schema: userSchema },
      },
    }
    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
  })
})
