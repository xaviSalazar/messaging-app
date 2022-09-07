export const newIncomingMessage = (object)=> async(dispatch) => {
    console.log(`dispatch(newIncomingMessage)`)
    dispatch({type: 'NEW-MESSAGE', payload: object})
}
