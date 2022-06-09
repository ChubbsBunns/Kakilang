import React from "react";
import Sidebar from "./Sidebar.component";
import MessageBox from "./MessageBox.component";
import ListOfPeople from "./ListOfPeople.component";
import Banner from "./Banner.component";

/**
 * Homepage of the User
 *
 * @TODO Actually make this a homepage
 *
 * @component
 */
function Home() {
  return (
    <div className="header-main">
      <Sidebar />
      <div className="main-UI" id="UI">
        {/**
        <div className="title" id="banner-text">
          Kakilang!
        </div>
  */}

        <Banner />
        <div className="banner-children">
          <div className="UI" id="list_of_people">
            <ListOfPeople />
          </div>
          <div className="UI" id="text_interface">
            <MessageBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
