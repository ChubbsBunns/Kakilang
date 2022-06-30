import React, { useEffect, useState } from "react";
import axios from "axios";

/** Import member components */
import Sidebar from "./Sidebar.component";
import ListOfPeople from "./ListOfPeople.component";
import ChatBox from "./ChatBox.component";
import ProfilePage from "./ProfilePage.component";
import EventsPage from "./EventsPage.component";

import staticGroup from "./staticGroup";

/**
 * Homepage of the User
 *
 *
 */
function Home() {
  const server = process.env.REACT_APP_SERVER;
  const currentUser = {
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    profileIMG: localStorage.getItem("img"),
  };
  const [current, setCurrent] = useState(currentUser);
  const [chatTarget, setChatTarget] = useState(currentUser);
  const [group, setGroup] = useState(staticGroup);
  const [dynamicList, setDynamicList] = useState(staticGroup);

  const onSelectPerson = (targetUser) => () => {
    {
      setChatTarget(targetUser);
    }
    setBox("ProfilePage");
  };

  const getGroupAsync = async () => {
    const response = await axios
      .get(server + "/users/getBasic")
      .then((res) => {
        return res.data.users;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    const index = response.findIndex(({ email }) => {
      console.log(email);
      return email == currentUser.email.toLowerCase();
    });
    const [curr] = response.splice(index, 1);
    console.log(curr);
    setCurrent(curr);
    response.unshift(curr);
    setGroup(response);
    setDynamicList(response);
  };

  useEffect(() => {
    getGroupAsync();
  }, []);

  const [box, setBox] = useState("ProfilePage");

  function ActiveBox(box) {
    switch (box) {
      case "ChatBox":
        return (
          <ChatBox
            img={chatTarget.profileIMG}
            name={chatTarget.name}
            email={chatTarget.email}
            onChat={setBox}
          />
        );
      case "EventsPage":
        return <EventsPage />;
      case "ProfilePage":
      default:
        return <ProfilePage target={chatTarget} onChat={setBox} />;
    }
  }

  return (
    <div className="header-main">
      <div>
        <Sidebar
          setBox={setBox}
          user={current}
          group={group}
          setGroup={setDynamicList}
        />
      </div>
      <div className="UI" id="list_of_people">
        <ListOfPeople group={dynamicList} onSelectPerson={onSelectPerson} />
      </div>

      {ActiveBox(box)}
    </div>
  );
}

export default Home;
