import axios from "axios"

const API_BASE_URL = "http://localhost:3001";

const createUser = async (userData) => {
   return await axios.post(`${API_BASE_URL}/user`, userData)
}

const searchUser = async (phoneNumber) => {
    return await axios.get(`${API_BASE_URL}/search-user?phone=${phoneNumber}`)
};

export const httpManager = {
    createUser,
    searchUser
};