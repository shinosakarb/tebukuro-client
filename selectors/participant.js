// @flow
import { createSelector } from 'reselect'

const participantEntities = state => state.participant.get('entities')
const participantErrors = state => state.participant.get('errors')

export const getParticipants = createSelector(
  participantEntities,
  (participants) => {
    const [...participantsMapArray] = participants.values()
    return participantsMapArray.map(participantMap => participantMap.toObject())
  },
)

export const getParticipantErrorsArray =
  createSelector(participantErrors, errors => errors.toArray())
