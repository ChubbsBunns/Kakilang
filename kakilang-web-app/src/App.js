import React, { useState } from "react";
import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Login from "./components/Login.component";
import Home from "./components/Home.component";
import Registration from "./components/Registration.component";
import TestFunction from "./components/TestFunction.component";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isAuth, setUserAuth] = useState(false);

  return (
    <div className="App">
      <div className="App-body">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login setAuth={setUserAuth} />} />
            <Route exact path="/register" element={<Registration />} />
            <Route
              path="/home/:handle"
              element={
                <ProtectedRoute isAuth={isAuth} redirectPath="/">
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route exact path="/SecretTesting" element={<TestFunction />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
