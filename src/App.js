import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/ui/Home';
import SignIn from './components/ui/SignIn';
import NavHeader from './components/ui/NavHeader';

import { useState } from 'react';
import Board from './components/ui/Board';
import TypeMenu from './components/ui/TypeMenu';
import Game from './components/logic/Game';



function App() {

  const [time, setTime] = useState();
  const [login, setLogin] = useState(getSavedLogin());

  function setGameTime(time) {
    setTime(time);
  }

  function saveLogin(login) {
    localStorage.setItem('login', JSON.stringify(login));
    setLogin(login);
  }

  function getSavedLogin() {
    if (localStorage.getItem('login')) {
      return JSON.parse(localStorage.getItem('login'));
    } else {
      return undefined;
    }
  }
  function logOut() {
    localStorage.removeItem("login");
    setLogin(undefined);
  }

  function displayLogIn() {
    if (login) {
      return (
        <>
          <Home />
        </>
      );
    } else {
      return (<SignIn saveLogin={saveLogin} />);
    }
  }

  const routes =
    <Routes>
      <Route path="/" element={displayLogIn()} />
      <Route path='/type-menu' element={<TypeMenu setTime={setGameTime} />} />
      {time ? <Route path='/board' element={<Board game={new Game(time, login)} />} /> : <></>}
    </Routes>

  return (
    <>
      <Router>
        {login ? <> <NavHeader username={login} logOut={logOut} />{routes}</> :
          <><Routes><Route path="/" element={displayLogIn()} /></Routes></>}
      </Router>
    </>
  );
}

export default App;
