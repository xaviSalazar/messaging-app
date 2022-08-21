import { getChannelList } from "../../api";


export const getMessagesFromChannel = (userId) => async(dispatch) => {
    try {
        const userMessages = await getChannelList(userId);
        dispatch({type: 'GET-MESSAGES', payload: userMessages.data.responseData});
    } catch(error) {
        console.log(error.message)
    }
}

