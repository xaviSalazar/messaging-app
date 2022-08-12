import * as api from '../api'

//Action creators
export const createUser = (userData) => async(dispatch) => {
    try {
        const { data } = await api.createUser(userData);
        dispatch( {type: 'CREATE-USER', payload: data})
    } catch (error) {
        console.log(error.message);
    }
}
     
export const createChannel = (requestData) => async(dispatch) => {
    try {
        const { data } = await api.createChannel(requestData);
        dispatch({type: 'CREATE-CHANNEL', payload: data})
    } catch(error) {
        console.log(error.message);
    }
}


export const getChannelList = (phoneNumber) => async(dispatch) => {
    try {
        const { data } = await api.getChannelList(phoneNumber);
        dispatch({type: 'GET-CHANNEL-LIST', payload: data});
    } catch(error) {
        console.log(error.message)
    }
}
    
export const sendMessage = (requestData) => async(dispatch) => {
    try {
        const { data } = await api.sendMessage(requestData);
        dispatch({type: 'SEND-MESSAGE', payload: data});
    } catch(error) {
        console.log(error.message)
    }
}
