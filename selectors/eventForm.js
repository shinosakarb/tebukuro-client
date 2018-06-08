// @flow
import { createSelector } from 'reselect'

const getNameErrorList = (state: Object) => state.eventForm.getIn(['name', 'errors'])
const getQuotaErrorList = (state: Object) => state.eventForm.getIn(['quota', 'errors'])
const getStartsAtErrorList = (state: Object) => state.eventForm.getIn(['eventStartsAt', 'errors'])
const getEndsAtErrorList = (state: Object) => state.eventForm.getIn(['eventEndsAt', 'errors'])

const isNameValidationFailed = (state: Object) => (
  !state.eventForm.getIn(['name', 'validationPassed'])
)
const isQuotaValidationFailed = (state: Object) => (
  !state.eventForm.getIn(['quota', 'validationPassed'])
)
const isStartsAtValidationFailed = (state: Object) => (
  !state.eventForm.getIn(['eventStartsAt', 'validationPassed'])
)
const isEndsAtValidationFailed = (state: Object) => (
  !state.eventForm.getIn(['eventEndsAt', 'validationPassed'])
)

export const getValidationErrorMessages =
  createSelector(
    [getNameErrorList, getQuotaErrorList, getStartsAtErrorList, getEndsAtErrorList],
    (nameErrorList, quotaErrorList, startsAtErrorList, endsAtErrorList) => ({
      name: nameErrorList.toArray(),
      quota: quotaErrorList.toArray(),
      eventStartsAt: startsAtErrorList.toArray(),
      eventEndsAt: endsAtErrorList.toArray(),
    }),
  )

export const isValidationFailed =
  createSelector(
    [
      isNameValidationFailed,
      isQuotaValidationFailed,
      isStartsAtValidationFailed,
      isEndsAtValidationFailed,
    ],
    (isNameFailed, isQuotaFailed, isStartsAtFailed, isEndsAtFailed) => (
      isNameFailed || isQuotaFailed || isStartsAtFailed || isEndsAtFailed
    ),
  )
