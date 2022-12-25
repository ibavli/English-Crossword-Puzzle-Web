import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/UI/NavBar';
import HomePage from './components/HomePage';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <HomePage />
    </React.Fragment>
  );
}

export default App;
