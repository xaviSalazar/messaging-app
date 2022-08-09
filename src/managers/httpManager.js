import axios from "axios"

//const API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = "https://whatsapp-cloud-backend.herokuapp.com";

const createUser = async (userData) => {
   return await axios.post(`${API_BASE_URL}/user`, userData)
}

const searchUser = async (phoneNumber) => {
    return await axios.get(`${API_BASE_URL}/search-user?phone=${phoneNumber}`)
};

const createChannel = async (requestData) => {
    return await axios.post(`${API_BASE_URL}/channel`, requestData)
};

const getChannelList = async (phoneNumber) => {
    return await axios.get(`${API_BASE_URL}/channel-list?phoneNumber=${phoneNumber}`)
};

const sendMessage = async (requestData) => {
    return await axios.post(`${API_BASE_URL}/message`, requestData)
};

const getAllUsers = async (client) => {
    return await axios.get(`${API_BASE_URL}/get-users?owner=${client}`)
};

export const httpManager = {
    createUser,
    searchUser,
    createChannel,
    getChannelList,
    sendMessage,
    getAllUsers,
};