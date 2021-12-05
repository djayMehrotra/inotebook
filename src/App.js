import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import {
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

const App = () => {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type:type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <>
      <NoteState>
        <HashRouter basename="/">
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route path='/' element={ <Home showAlert={showAlert} /> }></Route>
            <Route path='/about' element={ <About/> }></Route>
            <Route path='/login' element={ <Login showAlert={showAlert}/> }></Route>
            <Route path='/signup' element={ <Signup showAlert={showAlert}/> }></Route>
          </Routes>
        </HashRouter>
      </NoteState>
    </>
  );
}

export default App;
