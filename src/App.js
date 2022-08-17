import './App.css';
import Navbar from './pages/Navbar';
import Settings from './pages/Settings'
import MessagingPage from './pages/MessagingPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ContactsList from './pages/ContactsList';



function App() {
  // set variables to use within whatsapp

  return (
    <>
    <Router basename={process.env.PUBLIC_URL}>
    <Navbar/>
    <div className="app">
    <div className="app_body"> 
      <Routes>
          <Route path='/' exact element = {<MessagingPage />} />
          <Route path='/settings' exact element = {<Settings />} />
          <Route path='/contacts' exact element = {<ContactsList/>} />
      </Routes>
      </div>
      </div>
    </Router>
    </>
  );
  
}

export default App;
