import { combineReducers } from "redux"

import getUsers from './GetUsers/UsersReducer'
import getMessagesFromChannel from './GetMessages/Reducers'
import getPhone from './ConfigToken/Reducers'
import newIncomingMessage from './NewMessages/Reducers'

export default combineReducers({ getUsers, 
                                 getMessagesFromChannel, 
                                 getPhone,
                                 newIncomingMessage })