import { getAllUsers, searchUser} from "../../api";

export const getUsers = (client) => async(dispatch) => {
    try {
        const contactListData = await getAllUsers(client);
        const toSend = contactListData.data.responseData
        dispatch({type: 'GET-ALL-USERS', payload: toSend});
    } catch(error) {
        console.log('error')
        console.log(error.message)
    }
}

export const searchOneUser =(phoneNumber) => async(dispatch) => {
    try {
        const json = await searchUser(phoneNumber);
        if(json.data?.success) {
            console.log("in await") 
            dispatch({type: 'SEARCH-USER', payload: json.data.responseData})}
        else return 
    } catch(error) {
        console.log('error')
        console.log(error.message);
    }
}

export const updateLastMessage = (from, message) => async(dispatch) => {
    dispatch({type: 'NEW-MESSAGE', payload: {from, message}})
}
