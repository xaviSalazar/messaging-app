import axios from 'axios';

//const API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = "https://whatsapp-cloud-backend.herokuapp.com";
export const customerLogOut = (data) => axios.get(`${API_BASE_URL}/logout`, data)
export const customerAuth = (data) => axios.get(`${API_BASE_URL}/authUser`, data)
export const registerCustomer = (data) => axios.post(`${API_BASE_URL}/register`, data)
export const loginCustomer = (data) => axios.post(`${API_BASE_URL}/login`, data)
export const createUser = (userData) => axios.post(`${API_BASE_URL}/user`, userData)
export const searchUser = (phoneNumber) => axios.get(`${API_BASE_URL}/search-user?phone=${phoneNumber}`)
export const createChannel = (requestData) => axios.post(`${API_BASE_URL}/channel`, requestData)
export const getChannelList = (userId,page) => axios.get(`${API_BASE_URL}/channel-list?userId=${userId}&&page=${page}`)
export const sendMessage = (requestData) => axios.post(`${API_BASE_URL}/message`, requestData)
export const getAllUsers = (client) => axios.get(`${API_BASE_URL}/get-users?owner=${client}`)
export const sendCredentials = (requestData) => axios.post(`${API_BASE_URL}/save-user-data`, requestData)
