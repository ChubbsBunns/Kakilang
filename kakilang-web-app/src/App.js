import React, { useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

/** import Components & CSS **/
import Login from "./components/Login.component";
import Registration from "./components/Registration.component";
import TestFunction from "./components/TestFunction.component";
import ProtectedRoute from "./ProtectedRoute";
import NotMatch from "./components/NotMatch.component";
import Sidebar from "./components/Sidebar.component";
import ListOfPeople from "./components/List/ListOfPeople.component";
import EventsBox from "./components/Box/EventsBox.component";
import EventCreationBox from "./components/Box/EventCreationBox.component";
import ChatBox from "./components/Box/ChatBox.component";
import ProfileBox from "./components/Box/ProfileBox.component";
import EmptyList from "./components/List/EmptyList.component";

import "./App.css";
import ChatList from "./components/List/ChatList.component";
import EmptyBox from "./components/Box/EmptyBox.component";
import EventList from "./components/List/EventList.component";
import EventEditingBox from "./components/Box/EventEditingBox.component";
import MyEventList from "./components/List/MyEventList.component";
import ProfileEditingBox from "./components/Box/ProfileEditingBox.component";

function App() {
  const errorProfile = {
    name: "Error",
    profileIMG: "/defaultProfile.png",
    email: "Error@Erros.com",
  };
  const [isLogin, setLogin] = useState(false);
  const [isOwner, setOwnership] = useState(false);
  const [user, setUser] = useState(errorProfile);
  const [target, setTarget] = useState(errorProfile);

  return (
    <div className="App">
      <div className="App-body">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Login setAuth={setLogin} setUser={setUser} />}
            />
            <Route path="/register" element={<Registration />} />

            {/** Can only access if logged in**/}
            <Route
              element={<ProtectedRoute isAuth={isLogin} redirectPath="/" />}
            >
              <Route element={<Sidebar user={user} />}>
                <Route
                  path="/discover/kakis/*"
                  element={<ListOfPeople user={user} setTarget={setTarget} />}
                >
                  <Route path="" element={<EmptyBox />} />
                  <Route path=":targetHandle">
                    <Route
                      path="profile"
                      element={<ProfileBox user={user} target={target} />}
                    />

                    <Route
                      path="chat"
                      element={<ChatBox user={user} target={target} />}
                    />
                    <Route path="editProfile" element={<ProfileEditingBox />} />
                  </Route>
                </Route>

                <Route
                  path="/discover/events/*"
                  element={<EventList user={user} setTarget={setTarget} />}
                >
                  <Route path="" element={<EmptyBox />} />
                  <Route path=":eventID/*">
                    <Route
                      path=""
                      element={
                        <EventsBox
                          user={user}
                          target={target}
                          setOwnership={setOwnership}
                        />
                      }
                    />
                    <Route
                      path="chat"
                      element={<ChatBox user={user} target={target} />}
                    />
                  </Route>
                </Route>
                <Route
                  path="/myChats/*"
                  element={<ChatList user={user} setTarget={setTarget} />}
                >
                  <Route path="" element={<EmptyBox />} />
                  <Route path=":targetHandle/*">
                    <Route
                      path=""
                      element={
                        <EventsBox
                          user={user}
                          target={target}
                          setOwnership={setOwnership}
                        />
                      }
                    />
                    <Route
                      path="chat"
                      element={<ChatBox user={user} target={target} />}
                    />
                    <Route
                      path="profile"
                      element={<ProfileBox user={user} target={target} />}
                    />
                  </Route>
                </Route>

                <Route
                  path="/myEvents/*"
                  element={<MyEventList user={user} setTarget={setTarget} />}
                >
                  <Route path="" element={<EmptyBox />} />
                  <Route
                    path="create"
                    element={<EventCreationBox owner={user} />}
                  />
                  <Route
                    element={
                      <ProtectedRoute isAuth={isOwner} redirectPath="" />
                    }
                  >
                    <Route
                      path=":eventID/edit"
                      element={<EventEditingBox owner={user} target={target} />}
                    />
                  </Route>
                  <Route path=":eventID/*">
                    <Route
                      path=""
                      element={
                        <EventsBox
                          user={user}
                          target={target}
                          setOwnership={setOwnership}
                        />
                      }
                    />
                    <Route
                      path="chat"
                      element={<ChatBox user={user} target={target} />}
                    />
                  </Route>
                </Route>

                <Route path="myProfile/*" element={<EmptyList />}>
                  <Route
                    path=""
                    element={<ProfileBox user={user} target={user} />}
                  ></Route>{" "}
                  <Route path="Edit" element={<ProfileEditingBox />} />
                </Route>
              </Route>
              <Route path="*" element={<NotMatch />} />
            </Route>

            <Route exact path="/SecretTesting" element={<TestFunction />} />
            <Route path="*" element={<NotMatch />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
