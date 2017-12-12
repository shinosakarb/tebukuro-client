import { combineReducers } from 'redux'
import event from './event'
import participant from './participant'

export default combineReducers({
  event,
  participant,
})
