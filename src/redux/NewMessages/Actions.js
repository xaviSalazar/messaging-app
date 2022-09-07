export const newIncomingMessage = (object)=> async(dispatch) => {
    dispatch({type: 'NEW-MESSAGE', payload: object})
}
