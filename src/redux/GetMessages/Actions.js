import { getChannelList } from "../../api";


export const getMessagesFromChannel = (userId, page) => async(dispatch) => {
    try {
        const userMessages = await getChannelList(userId, page);
        console.log(userMessages.data.responseData)
        dispatch({type: 'GET-MESSAGES', payload: userMessages.data.responseData});
    } catch(error) {
        console.log(error.message)
    }
}

