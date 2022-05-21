import React from "react";
import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";

//component imports
import Login from "./components/Login.component";
import Home from "./components/Home.component";
import Registration from "./components/Registration.component";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/" className="App-link">
          {" "}
          <h1> Kakilang!</h1>{" "}
        </a>
      </header>
      <div className="App-body">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Registration />} />
            <Route path="/home/:handle" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
