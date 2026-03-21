import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Md5 from './Md5';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Bem Vindo ao Banco de dados MD5 - SAC 2019</h1>
          </header>
          <div>
            <Routes>
              <Route exact path="/" element={<Md5 />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
