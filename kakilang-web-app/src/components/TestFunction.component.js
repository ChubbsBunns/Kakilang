import React, { useState } from "react";
import ProfilePage from "./ProfilePage.component";
import ChatBox from "./ChatBox.component";

/**
 * This functional component is used purely for testing purposes
 */
function TestFunction() {
  const [chat, setChat] = useState(false);

  const onChat = () => setChat(!chat);

  return (
    <>
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
    </>
  );
}

export default TestFunction;

const chatTarget = {
  cca: ["USP Tabletop"],
  createdAt: "2022-06-22T07:08:36.596Z",
  email: "dylanho@email.com",
  house: "Saren",
  major: "Computer Engineering",
  name: "Dylan Ho",
  password: "",
  profileIMG:
    "https://res.cloudinary.com/duvdcuuvt/image/upload/v1655881716/DEV/xkmyj5ouqbgquvxfgvfh.jpg",
  floor: 16,
  updatedAt: "2022-06-22T07:08:36.596Z",
  __v: 0,
  _id: "62b2bff4dd64d02a57a6b5ec",
};
