import React from "react";
import "./ProfilePage.component.css";
import dylan_face from "./images/Dylan-img1.png";

function ProfilePage() {
  return (
    <div className="container-profile-page">
      <div className="profile-box">
        <div></div>
        <div className="image-name-box">
          <img src={dylan_face} className="profile-picture" />
          <span className="name">
            <br></br>Dylan Ho
            <br></br>
            <br></br>
            <span className="year">Year 2</span>
            <br></br>
            <span className="major">Computer Engineering</span>
            <br></br>
            <br></br>
            <div className="message-button">
              <a href="#" className="fa-solid fa-message"></a>
            </div>
          </span>
          <a href="#" className="cancel-button">
            <i className="fa-solid fa-xmark"></i>
          </a>
        </div>
        <div className="something">
          {" "}
          <a href="#" className="cancel-button">
            <i className="fa-solid fa-xmark"></i>
          </a>
        </div>
        <div></div>
        <div className="information-box">
          <p className="interests-row">
            Interests:{" "}
            <span className="interests">
              Gaming, Books and Hardcore Snail Racing{" "}
            </span>
          </p>
          <p className="house-row">
            House: <span className="house">Saren</span>
          </p>
          <p className="floor-row">
            Floor: <span className="floor">Cinnamon Wing 16 Floor</span>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default ProfilePage;
