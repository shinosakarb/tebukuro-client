// @flow
import { Set } from 'immutable'
import Record from './Base'

export const EventRecord = Record({
  id: 0,
  name: '',
  description: '',
  participants: Set.of(),
})

export default class Event extends EventRecord {
  setParticipants(list: ?Object[]) {
    return this.set('participants', Set.of(...list))
  }
}
