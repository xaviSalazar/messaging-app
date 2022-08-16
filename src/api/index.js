import axios from 'axios';

//const API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = "https://whatsapp-cloud-backend.herokuapp.com";

export const createUser = (userData) => axios.post(`${API_BASE_URL}/user`, userData)
export const searchUser = (phoneNumber) => axios.get(`${API_BASE_URL}/search-user?phone=${phoneNumber}`)
export const createChannel = (requestData) => axios.post(`${API_BASE_URL}/channel`, requestData)
export const getChannelList = (phoneNumber) => axios.get(`${API_BASE_URL}/channel-list?phoneNumber=${phoneNumber}`)
export const sendMessage = (requestData) => axios.post(`${API_BASE_URL}/message`, requestData)
export const getAllUsers = (client) => axios.get(`${API_BASE_URL}/get-users?owner=${client}`)