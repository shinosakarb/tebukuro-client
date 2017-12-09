import { normalize } from 'normalizr'

const isPromise = payload => payload instanceof Promise
const canNormalize = action =>
  !action.error && action.meta && action.meta.normalizr &&
  !isPromise(action.payload)

const normalizeMiddleware = () => next => (action) => {
  if (canNormalize(action)) {
    const payload = normalize(action.payload, action.meta.normalizr.schema)
    return next({ ...action, payload })
  }
  return next(action)
}

export default normalizeMiddleware
