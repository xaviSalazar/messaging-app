import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import { useState } from 'react';

function App() {

  const [selectedChat, setChat] = useState();
  const [refreshContactList, toggleRefreshContactist] = useState(false);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar 
          setChat = {setChat}
          refreshContactList={refreshContactList}
        />
        <Chat 
          selectedChat = {selectedChat} 
          refreshContactList = {() => 
          toggleRefreshContactist(!refreshContactList)
          }
        />
      </div>
    </div>
  );
}

export default App;
