import './App.css';
import MessagingPage from './pages/MessagingPage';
// import Sidebar from './components/Sidebar/Sidebar';
// import Chat from './components/Chat/Chat';
// import { useState } from 'react';

function App() {

  // const [selectedChat, setChat] = useState();
  // const [MessagesList, setMessagesList] = useState([]);

  return (
    <div className="app">
      <div className="app_body">
        <MessagingPage />
        {/* <Sidebar setChat = {setChat} setMessagesList = {setMessagesList}/>
        <Chat selectedChat = {selectedChat} MessagesList = {MessagesList}/> */}
      </div>
    </div>
  );
  
}

export default App;
