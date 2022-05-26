import React from "react";
import "./App.css";
/* WILLIAM INITIAL STUFF
import { Routes, BrowserRouter, Route } from "react-router-dom";

//component imports
import Login from "./components/Login.component";
import Home from "./components/Home.component";
import Registration from "./components/Registration.component";
*/
function App() {
  return (
    /* WILLIAM INITIAL STUFF
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
        <div className="sidebar">
          <header>My Kakis!</header>
          <ul className="sidebar-menu">
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
            <li className="sub-menu">
              <a href="#"><i className="fa fa-baseball-bat-ball"></i> CCAs/IGs<i className="fa fa-chevron-circle-down indicator"></i></a>
              <ul>
                <li>
                  <a href="#"><i className="fa fa-bicycle"></i>Cycling</a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-volleyball"></i>Volleyball
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-masks-theater"></i>USProductions
                  </a>
                </li>
              </ul>
            </li>
          </ul>
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
