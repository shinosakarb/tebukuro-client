// @flow
import { createSelector } from 'reselect'

const getEventEntities = state => state.event.get('entities')
const getEventErrors = state => state.event.get('errors')

export const getEventId = (state: Object) => state.event.get('entityId')
export const getEventErrorsArray = createSelector(getEventErrors, errors => errors.toArray())
export const getCurrentEvent = createSelector(
  [getEventId, getEventEntities],
  (id, entities) => {
    const entitiesObject = entities.get(id.toString()).toObject()
    return {
      ...entitiesObject,
      participants: entitiesObject.participants.toArray(),
    }
  },
)
export const getHasWaitlist =
  createSelector(getCurrentEvent, event => event.participants.length >= event.quota)
export const getHasNotFoundError =
  createSelector(getEventErrors, errors => errors.indexOf('Not Found') !== -1)
