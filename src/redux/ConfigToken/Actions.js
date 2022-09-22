import {SAVE_CONFIG_TOKENS} from './types'

export const doSaveTokens = (config) => async(dispatch) => {
        // first delete all what was found
        const tokens = localStorage.getItem("whatsapp_app")
        localStorage.removeItem("sessionID")
        if(tokens) {localStorage.removeItem("whatsapp_app")}
        localStorage.setItem("whatsapp_app", JSON.stringify(config))
        alert("saved data")
        dispatch( {type: SAVE_CONFIG_TOKENS, payload: config})
        return config;
}


export const loadDbSavedTokens = (config) => async(dispatch) => {
         // first delete all what was found
         const tokens = localStorage.getItem("whatsapp_app")
         localStorage.removeItem("sessionID")
         if(tokens) {localStorage.removeItem("whatsapp_app")}
         localStorage.setItem("whatsapp_app", JSON.stringify(config))
         dispatch( {type: SAVE_CONFIG_TOKENS, payload: config})
         return config;
        // do fetch of local tokens
}