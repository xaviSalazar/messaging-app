import './App.css';
import Navbar from './pages/Navbar';
import Settings from './pages/Settings'
import MessagingPage from './pages/MessagingPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



function App() {
  // set variables to use within whatsapp

  return (
    <>
    <Router>
    <div className="app">
      <div className="app_body">
      <Navbar/>
      <Routes>
          <Route path='/' exact element = {<MessagingPage />} />
          <Route path='/settings' exact element = {<Settings />} />
      </Routes>
      </div>
      </div>
    </Router>
    </>
  );
  
}

export default App;
