import { combineReducers } from 'redux'
import User from './modules/User'
import Modal from './modules/Modal'
import Admin from './modules/Admin'

export default combineReducers({
  User,
  Modal,
  Admin,
})
