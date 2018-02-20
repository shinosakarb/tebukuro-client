// @flow
import { createSelector } from 'reselect'

const getNameErrorList = (state: Object) => state.eventForm.getIn(['name', 'errors'])
const getQuotaErrorList = (state: Object) => state.eventForm.getIn(['quota', 'errors'])

const isNameValidationFailed = (state: Object) => (
  !state.eventForm.getIn(['name', 'validationPassed'])
)
const isQuotaValidationFailed = (state: Object) => (
  !state.eventForm.getIn(['quota', 'validationPassed'])
)

export const getValidationErrorMessages =
  createSelector(
    [getNameErrorList, getQuotaErrorList],
    (nameErrorList, quotaErrorList) => ({
      name: nameErrorList.toArray(),
      quota: quotaErrorList.toArray(),
    }),
  )

export const isValidationFailed =
  createSelector(
    [isNameValidationFailed, isQuotaValidationFailed],
    (isNameFailed, isQuotaFailed) => isNameFailed || isQuotaFailed,
  )
