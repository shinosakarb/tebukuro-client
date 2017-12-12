// @flow
import { createSelector } from 'reselect'

const getEventEntities = state => state.event.get('entities')
const getEventErrors = state => state.event.get('errors')

export const getEventId = (state: Object) => state.event.get('entityId')
export const getEventErrorsArray = createSelector(getEventErrors, errors => errors.toArray())
export const getCurrentEvent = createSelector(
  [getEventId, getEventEntities],
  (id, entities) => entities.get(id.toString()).toObject(),
)
