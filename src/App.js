import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/ui/Home';
import SignIn from './components/ui/SignIn';
import NavHeader from './components/ui/NavHeader';

import { useState } from 'react';
import Board from './components/ui/Board';



function App() {


  const [login, setLogin] = useState(getSavedLogin());

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

  return (
    <>
      <Router>
        {login ? <NavHeader username={login} logOut={logOut} /> : <></>}
        <Routes>
          <Route path="/" element={displayLogIn()} />
          <Route path='/board' element={<Board whiteName={login} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
