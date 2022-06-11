import './App.css';
import React from 'react';
import Principal from './components/Principal';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
            <Routes>
              <Route exact path="/" element={<Login/>}>
              </Route>
              <Route exact path="/usuarios" element={<Principal/>}>
              </Route>
            </Routes>
    </Router>
  );
}

export default App;
