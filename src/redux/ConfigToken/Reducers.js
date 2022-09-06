import {SAVE_CONFIG_TOKENS} from './types'

const initialState = {
    phoneNumber : "",
    token : "",
    phoneNumberId : ""
}

const configTokenReducer = (config = initialState, action) => {

    switch( action.type ) {
        case SAVE_CONFIG_TOKENS:
            return action.payload

        default:
            const tokens = localStorage.getItem("whatsapp_app")
            if(tokens) return tokens
            else return config;
    }
} 

export default configTokenReducer;