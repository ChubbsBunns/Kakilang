import React from "react";
import Sidebar from "./Sidebar.component";

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
  );
}

export default Home;
