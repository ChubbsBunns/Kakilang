import React from "react";
import "./ProfilePage.component.css";
import PropTypes from "prop-types";

function ProfilePage({ target, onChat }) {
  const disabling = target.email == localStorage.getItem("email");

  const ChatButton = (disable) => {
    return disable ? (
      <></>
    ) : (
      <div className="message-button">
        <a onClick={onChat} className="fa-solid fa-message"></a>
      </div>
    );
  };

  const Year = <span className="year">Year 2</span>;

  const Major =
    target.major != "undefined" ? (
      <span className="major">{target.major}</span>
    ) : (
      <></>
    );

  const House =
    target.house != "undefined" ? (
      <p className="house-row">
        House: <span className="house">{target.house}</span>
      </p>
    ) : (
      <></>
    );

  const Floor = target.floor ? (
    <p className="floor-row">
      Floor:
      <span className="floor"> Cinnamon Wing {target.floor} Floor</span>
    </p>
  ) : (
    <></>
  );

  return (
    <div className="container-profile-page">
      <div className="profile-box">
        <div></div>
        <div className="image-name-box">
          <img src={target.profileIMG} className="profile-picture" />
          <span className="name">
            <br />
            {target.name}
            <br />
            <br />
            {Year}
            <br />
            {Major}
            <br />
            <br />
            {ChatButton(disabling)}
          </span>
          {/* This one is the one that works */}
          {/* 
          <a href="#" className="cancel-button">
            <i className="fa-solid fa-xmark"></i>
          </a>
          */}
        </div>
        {/* This one is the one i want to implement */}
        <div className="something"></div>
        <div></div>
        <div className="information-box">
          <p className="interests-row">
            Interests:{" "}
            <span className="interests">
              Gaming, Books and Hardcore Snail Racing{" "}
            </span>
          </p>
          {House}
          {Floor}
        </div>
        <div></div>
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  target: PropTypes.object.isRequired,
  onChat: PropTypes.func.isRequired,
};

export default ProfilePage;
