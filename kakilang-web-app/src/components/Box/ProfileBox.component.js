import React from "react";
import PropTypes from "prop-types";
import "./ProfileBox.component.css";
import { useNavigate } from "react-router";

/**
 * This is a Profile Box.
 *
 * As a Box, it will occupy only the right side of the page.
 * A list is required or there will be empty spaces.
 */
function ProfileBox({ user, target }) {
  /** Constants */
  const disabling = target.email == user.email.toLowerCase();
  const navigate = useNavigate();

  /** Handle changes **/
  const goToChat = () => navigate("../chat");
  const ChatButton = (disable) => {
    return disable ? (
      <></>
    ) : (
      <div className="message-button">
        <a onClick={goToChat} className="fa-solid fa-message"></a>
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
        <div className="image-name-box">
          <img src={target.profileIMG} className="profile-picture" />
          <span className="name">
            <br />
            {target.name}
            <br />

            {Year}
            <br />
            {Major}
            {ChatButton(disabling)}
          </span>
        </div>
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
        <div className="edit-button-div">
          <button className="edit-button">Edit</button>
        </div>
      </div>
    </div>
  );
}

ProfileBox.propTypes = {
  user: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
};

export default ProfileBox;
