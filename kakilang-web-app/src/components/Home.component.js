import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.component";

import ListOfPeople from "./ListOfPeople.component";
import axios from "axios";
import ChatBox from "./ChatBox.component";
import ProfilePage from "./ProfilePage.component";

/** Static Group import */
import dylan1 from "./images/Dylan-img1.png";
import marcus_dp from "./images/marcus.jpg";
import sherwin_dp from "./images/sherwin.jpg";
import xuanyi_dp from "./images/xy.jpg";
import stephen_dp from "./images/stephen.jpg";
import yongjie_dp from "./images/yong jie.jpg";
import william_dp from "./images/william.jpg";

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
  const [chatTarget, setChatTarget] = useState(currentUser);
  const [group, setGroup] = useState(staticGroup);
  const onSelectPerson = (targetUser) => () => {
    console.log(targetUser);
    setChatTarget(targetUser);
    setChat(false);
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
    setGroup(response);
  };

  useEffect(() => {
    getGroupAsync();
  }, []);

  const [chat, setChat] = useState(false);
  const onChat = () => setChat(!chat);

  return (
    <div className="header-main">
      <div>
        <Sidebar />
      </div>
      <div className="UI" id="list_of_people">
        <ListOfPeople group={group} onSelectPerson={onSelectPerson} />
      </div>
      {chat ? (
        <ChatBox
          img={chatTarget.profileIMG}
          name={chatTarget.name}
          email={chatTarget.email}
          onChat={onChat}
        />
      ) : (
        <ProfilePage target={chatTarget} onChat={onChat} />
      )}
    </div>
  );
}

export default Home;

const staticGroup = [
  {
    img: dylan1,
    name: "Dylan Ho",
    email: "dylanho@email.com",
    _id: 1,
  },
  {
    img: marcus_dp,
    name: "Marcus Lim",
    email: "marcuslim@email.com",
    _id: 2,
  },
  {
    img: sherwin_dp,
    name: "Sherwin Lim",
    email: "sherwinlim@lmao.com",
    _id: 3,
  },
  {
    img: xuanyi_dp,
    name: "Xuan Yi",
    email: "xuanyi@email.com",
    _id: 4,
  },
  {
    img: stephen_dp,
    name: "Stephen",
    email: "stephen@email.com",
    _id: 5,
  },
  {
    img: yongjie_dp,
    name: "Yong Jie",
    email: "yongjie@email.com",
    _id: 6,
  },
  {
    img: william_dp,
    name: "William Chau",
    email: "lmao@lmao.com",
    _id: 7,
  },
];
