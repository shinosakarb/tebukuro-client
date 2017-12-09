// @flow
import { normalize } from 'normalizr'
import type { ReduxAction, ActionPayload } from '../types/redux'

const isPromise = (payload: ActionPayload) => payload instanceof Promise
const canNormalize = (action: ReduxAction) =>
  !action.error && action.meta && action.meta.normalizr &&
  !isPromise(action.payload)

const normalizeMiddleware = () => (next: Function) => (action: ReduxAction) => {
  if (canNormalize(action)) {
    const payload = normalize(action.payload, action.meta.normalizr.schema)
    return next({ ...action, payload })
  }
  return next(action)
}

export default normalizeMiddleware
