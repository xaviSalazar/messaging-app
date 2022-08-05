import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import { useState } from 'react';

function App() {

  const [selectedChat, setChat] = useState();

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar setChat = {setChat}/>
        <Chat selectedChat={selectedChat}/>
      </div>
    </div>
  );
}

export default App;
