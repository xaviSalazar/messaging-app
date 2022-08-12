import { combineReducers } from "redux"

import getUsers from './GetUsers/UsersReducer'
import getMessagesFromChannel from './GetMessages/Reducers'

export default combineReducers({ getUsers, getMessagesFromChannel})