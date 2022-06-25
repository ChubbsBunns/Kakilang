<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState } from "react";

>>>>>>> homepage-banner-remove
import Sidebar from "./Sidebar.component";

import ListOfPeople from "./ListOfPeople.component";
<<<<<<< HEAD
import Banner from "./Banner.component";
import axios from "axios";
import ChatBox from "./ChatBox.component";
import ProfilePage from "./ProfilePage.component";

/** Static Group import */
=======

/*
import EventsPage from "./EventsPage.component";
import Banner from "./Banner.component";
import ProfilePage from "./ProfilePage.component";
*/


import ChatBox from "./ChatBox.component";


>>>>>>> homepage-banner-remove
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
<<<<<<< HEAD
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
=======
  
  const group = [
    {
      img: dylan1,
      name: "Dylan Ho",
      email: "example@email.com",
      _id: 1,
    },
    {
      img: marcus_dp,
      name: "Marcus Lim",
      email: "third@email.com",
      _id: 2,
    },
    {
      img: sherwin_dp,
      name: "Sherwin Lim",
      email: "lmao@lmao.com",
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
      email: "william@lmao.com",
      _id: 7,
    },
  ];
  

  
  const [chatTarget, setChatTarget] = useState({
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    img: localStorage.getItem("img"),
  });


  const onSelectPerson = (targetUser) => () => setChatTarget(targetUser);
>>>>>>> homepage-banner-remove

  return (
    <div className="header-main">
      <div>
        <Sidebar />
      </div>
      <div className="UI" id="list_of_people">
        <ListOfPeople group={group} onSelectPerson={onSelectPerson} />
      </div>

      <div className="UI" id="text_interface">
        <ChatBox
          email={chatTarget.email}
          name={chatTarget.name}
          img={chatTarget.img}
        />
      </div>
    

      {/** This is from the previous UI with the banner
      <div className="main-UI" id="UI">
        <Banner />

        <div className="banner-children">
          <div className="UI" id="list_of_people">
            <ListOfPeople group={group} onSelectPerson={onSelectPerson} />
          </div>
<<<<<<< HEAD
          {chat ? (
=======
          
          <ProfilePage />
           
          <div className="UI" id="text_interface">
>>>>>>> homepage-banner-remove
            <ChatBox
              img={chatTarget.profileIMG}
              name={chatTarget.name}
              email={chatTarget.email}
              onChat={onChat}
            />
<<<<<<< HEAD
          ) : (
            <ProfilePage target={chatTarget} onChat={onChat} />
          )}
=======
          </div>
>>>>>>> homepage-banner-remove
        </div>
      </div>
    */}
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
