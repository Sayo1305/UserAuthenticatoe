import './App.css';
import React from 'react';
import {Route , Routes} from 'react-router-dom'
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
function App() {
  const API = 'http://localhost:3001';
  return (
    <div>
      <Routes>
        <Route element={<Register API={API}/>} path='/Register'></Route>
        <Route element={<Home/>} path='/'></Route>
        <Route element={<Login API={API}/>} path='/Login'></Route>
      </Routes>
    </div>
  );
}

export default App;
