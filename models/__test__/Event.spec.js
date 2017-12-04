import { Set } from 'immutable'
import Event from '../Event'
import ParticipantParams from '../../factories/Participant'

describe('Event', () => {
  describe('setParticipants', () => {
    it('should set given array of patricipants.', () => {
      const event = new Event()
      const participants = [ParticipantParams.participant1]

      const subject = event.setParticipants(participants)

      expect(subject.participants).toEqual(Set.of(...participants))
    })
  })
})
