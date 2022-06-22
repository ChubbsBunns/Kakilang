
import React, { useState } from "react";
import Sidebar from "./Sidebar.component";
import ListOfPeople from "./ListOfPeople.component";
import Banner from "./Banner.component";
/*
import ProfilePage from "./ProfilePage.component";
*/
import ChatBox from "./ChatBox.component";
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
  const [chatTarget, setChatTarget] = useState({
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    img: localStorage.getItem("img"),
  });
  const onSelectPerson = (targetUser) => () => setChatTarget(targetUser);

  return (
    <div className="header-main">
      <Sidebar />
      <div className="main-UI" id="UI">
        <Banner />
        <div className="banner-children">
          <div className="UI" id="list_of_people">
            
            <ListOfPeople group={group} onSelectPerson={onSelectPerson} />
  
          </div>
          {/** 
          <ProfilePage />
           */}
          <div className="UI" id="text_interface">
            <ChatBox
              email={chatTarget.email}
              name={chatTarget.name}
              img={chatTarget.img}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}

const group = [
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

export default Home;
