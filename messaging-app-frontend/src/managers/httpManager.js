import axios from "axios"

//const API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = "https://whatsapp-cloud-backend.herokuapp.com";
const WHATSAPP_BASE_URL= "https://graph.facebook.com/v13.0";
const whatsapp_token = "EAAGaJHJ3sbkBAEADpMkQbn2LYAZCJL7uvwTAsujA9UyxPCAGpocFCjPCfXeNMAe1B9ZBRzEKOHNIH26ZAMLFPKVqdIWQ9eE119VWA14hr40N0415AkMR8T37CehNdzIEgiAZC7cJuF3Ql1O9Jwid83kaWSN3LYq4PXB2WWgV40Qa1fn61Hc3pYVAWR3nIyA4OP9xZCAJbigZDZD";

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

const sendApiMessage = async(requestData) => {
    return await axios.post(`${WHATSAPP_BASE_URL}/102422749236585/messages?access_token=${whatsapp_token}`, requestData);
}

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
    sendApiMessage
};