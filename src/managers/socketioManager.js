import { io } from "socket.io-client"

//const URL = "http://localhost:3001";

const URL = "https://whatsapp-cloud-backend.herokuapp.com";

const socket = io(URL, {autoConnect: false});

export default socket;