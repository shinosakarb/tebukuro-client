// @flow
import { createSelector } from 'reselect'

const participantErrors = state => state.participant.get('errors')
// eslint-disable-next-line import/prefer-default-export
export const getParticipantErrorsArray =
  createSelector(participantErrors, errors => errors.toArray())
