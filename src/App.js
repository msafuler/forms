import React from 'react';
import Form from './components/Form';
import Answers from './components/Answers';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="nav-item">
              <NavLink
                to="/create_form"
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive ? "4px solid rgba(15,100,79,0.7)" : "",
                  };
                }}
              >
                Questions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/submit_form"
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive ? "4px solid rgba(15,100,79,0.7)" : "",
                  };
                }}
              >
                Responses
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/create_form" element={<Form />}
          />
          <Route path="/submit_form" element={<Answers />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
