import React, { useState } from "react";
import Sidebar from "./Sidebar.component";
import ChatBox from "./ChatBox.component";
import PeopleBox from "./PeopleBox.component";

/**
 * Homepage of the User
 *
 * @TODO Actually make this a homepage
 *
 * @component
 */
function Home() {
  const group = ["lmao@lmao.com", "example@email.com", "third@email.com"];
  const [chatTarget, setChatTarget] = useState("example@email.com");
  const onSelectPerson = (event) => setChatTarget(event.target.value);

  return (
    <div className="header-main">
      <Sidebar />

      <div className="title" id="banner-text">
        Kakilang!
        <div className="banner">
          <div className="UI" id="list_of_people">
            <PeopleBox group={group} onSelectPerson={onSelectPerson} />
          </div>
          <div className="UI" id="text_interface">
            {chatTarget}
            <ChatBox email={chatTarget} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
