import { getChannelList } from "../../api";


export const getMessagesFromChannel = (phoneNumber) => async(dispatch) => {
    try {
        const userMessages = await getChannelList(phoneNumber);
        dispatch({type: 'GET-MESSAGES', payload: userMessages.data.responseData});
    } catch(error) {
        console.log(error.message)
    }
}

