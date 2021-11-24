import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import {
  Route,
  Routes,
  Link,
  HashRouter,
  Switch
} from "react-router-dom";

function App() {
  return (
    <>
      <NoteState>
        <HashRouter basename="/">
          <Navbar />
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
