import { schema } from 'normalizr'
import ParticipantSchema from './participant'

const EventSchema = new schema.Entity('event', {
  participants: [ParticipantSchema],
})

export default EventSchema
