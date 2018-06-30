// @flow
import { createSelector } from 'reselect'
import moment from 'moment-timezone'

const localizeISOString = (isostring: string) => (
  moment(isostring).locale('ja').format('LLLL')
)

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
      eventStartsAt: localizeISOString(entitiesObject.eventStartsAt),
      eventEndsAt: localizeISOString(entitiesObject.eventEndsAt),
      participants: entitiesObject.participants.toArray(),
      userParticipation: entitiesObject.userParticipation.toObject(),
    }
  },
)
export const getHasWaitlist =
  createSelector(getCurrentEvent, event => event.participants.length >= event.quota)
export const getUserParticipation =
  createSelector(getCurrentEvent, event => event.userParticipation)
export const getHasNotFoundError =
  createSelector(getEventErrors, errors => errors.indexOf('Not Found') !== -1)
