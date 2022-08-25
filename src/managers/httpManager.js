import axios from "axios"

const API_BASE_URL = "http://localhost:3001";
//const API_BASE_URL = "https://whatsapp-cloud-backend.herokuapp.com";

// do functions to register users
const registerCustomer = async (data) => {
    return await axios.post(`${API_BASE_URL}/register`, data)
}

const createUser = async (userData) => {
   return await axios.post(`${API_BASE_URL}/user`, userData)
}

const searchUser = async (phoneNumber) => {
    return await axios.get(`${API_BASE_URL}/search-user?phone=${phoneNumber}`)
};

const createChannel = async (requestData) => {
    return await axios.post(`${API_BASE_URL}/channel`, requestData)
};

const getChannelList = async (userId) => {
    return await axios.get(`${API_BASE_URL}/channel-list?userId=${userId}`)
};

const sendMessage = async (requestData) => {
    return await axios.post(`${API_BASE_URL}/message`, requestData)
};

const getAllUsers = async (client) => {
    return await axios.get(`${API_BASE_URL}/get-users?owner=${client}`)
};

const deleteALlMsg = async(channel_id) => {
    return await axios.get(`${API_BASE_URL}/delete-messages?channel_id=${channel_id}`)
}

const checkMsgToRead = async(user_id) => {
    return await axios.get(`${API_BASE_URL}/change-to-read?user_id=${user_id}`)
}

const sendBusinessMessage = async(requestData) => {
    return await axios.post(`${API_BASE_URL}/init-conversation`, requestData)
}

export const httpManager = {
    createUser,
    searchUser,
    createChannel,
    getChannelList,
    sendMessage,
    getAllUsers,
    deleteALlMsg,
    sendBusinessMessage,
    registerCustomer,
    checkMsgToRead
};