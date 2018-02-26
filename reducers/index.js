import { combineReducers } from 'redux'
import event from './event'
import eventForm from './eventForm'
import participant from './participant'

export default combineReducers({
  event,
  eventForm,
  participant,
})
