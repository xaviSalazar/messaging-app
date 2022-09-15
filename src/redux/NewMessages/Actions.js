export const newIncomingMessage = (object)=> async(dispatch) => {
    dispatch({type: 'NEW-MESSAGE', payload: object})
}

export const clearMessages = () => async(dispatch) => {
    dispatch({type: 'CLEAR-MESSAGES'})
}

