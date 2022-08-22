import { combineReducers } from "redux"

import getUsers from './GetUsers/UsersReducer'
import getMessagesFromChannel from './GetMessages/Reducers'
import getPhone from './ConfigToken/Reducers'
import newIncomingMessage from './NewMessages/Reducers'
import customerReducer from './Authentification/Reducers'
import configTokenReducer from './ConfigToken/Reducers'

export default combineReducers({ getUsers, 
                                 getMessagesFromChannel, 
                                 getPhone,
                                 newIncomingMessage,
                                 customerReducer,
                                 configTokenReducer })