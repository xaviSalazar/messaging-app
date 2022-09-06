import { io } from "socket.io-client"

//const URL = "http://localhost:3001";
const URL = "https://whatsapp-cloud-backend.herokuapp.com";

export const socket = io(URL, {autoConnect: false});

// function to store a key with a time
export  const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
    // item contains original value 
    const item = {
        value: value,
        expiry: now.getTime() + ttl, 
    }    
    localStorage.setItem(key, JSON.stringify(item))
}


export  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key)
    if(!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date()
    // compare expire time with current time
    if(now.getTime() > item.expiry) {
        // delete item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
}
