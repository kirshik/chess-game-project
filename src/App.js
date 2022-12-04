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
  const [blackName, setBlackName] = useState();

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
    document.location.href = "/";
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
      {/* TO CHANGE */}
      <Route path='/type-menu' element={<TypeMenu setTime={setGameTime} setblackName={setBlackName} type={"human"} />} />
      {/* , "black", "human", 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3' */}
      {time ? <Route path='/board' element={<Board game={new Game(time, login, blackName)} />} /> : <></>}
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
