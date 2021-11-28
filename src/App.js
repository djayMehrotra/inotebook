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
import { Alert } from './components/Alert';

const App = () => {
  return (
    <>
      <NoteState>
        <HashRouter basename="/">
          <Navbar />
          <Alert />
          <Routes>
            <Route path='/' element={ <Home /> }></Route>
            <Route path='/about' element={ <About/> }></Route>
          </Routes>
        </HashRouter>
      </NoteState>
    </>
  );
}

export default App;
