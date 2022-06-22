import React from "react";
import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Login from "./components/Login.component";
import Home from "./components/Home.component";
import Registration from "./components/Registration.component";
import TestFunction from "./components/TestFunction.component";

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Registration />} />
            <Route path="/home/:handle" element={<Home />} />
            <Route exact path="/SecretTesting" element={<TestFunction />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
