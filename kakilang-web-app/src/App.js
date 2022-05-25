import React from "react";
import "./App.css";
/*
import { Routes, BrowserRouter, Route } from "react-router-dom";

//component imports
import Login from "./components/Login.component";
import Home from "./components/Home.component";
import Registration from "./components/Registration.component";
*/
function App() {
  return (
    /*
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
    */
   <body>
    <div className="header-main">
      <div className="entire-sidebar">


        <div className="sidebar">
          <header>My Kakis!</header>
          <ul>
            <li>
              <a href="#">
                <span className="fa fa-house"></span>
                <span id="Houses"> Housemates</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa fa-people-roof"></span>
                <span id="Floor"> Floormates</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa fa-baseball-bat-ball"></span>
                <span id="Interest_Groups"> CCAs/IGs</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="title" id="banner-text">
        Kakilang!
        <div className="banner">
          <div className="UI" id="list_of_people">
            Peoplepeoplepeople
          </div>
          <div className="UI" id="text_interface">
            textingtextingtexting
          </div>
        </div>
      </div>
    </div>
    </body>
  );
}

export default App;
