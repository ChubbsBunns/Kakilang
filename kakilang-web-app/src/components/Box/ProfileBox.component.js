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
  const isUser = target._id == user._id;
  const navigate = useNavigate();

  /** Handle changes **/
  const goToProfile = () => navigate("/myProfile/Edit");

  const goToChat = () => navigate("../chat");
  const ChatButton = (isUser) => {
    return isUser ? (
      <></>
    ) : (
      <div className="message-button">
        <a onClick={goToChat} className="fa-solid fa-message"></a>
      </div>
    );
  };
  const profile = target.profile;
  function EditButton(isAllowed) {
    if (isAllowed) {
      return (
        <div className="edit-button-div">
          <button className="edit-button">Edit</button>
        </div>
      );
    } else {
      return <></>;
    }
  }

  return (
    <div className="container-profile-page">
      <div className="profile-box">
        <div className="image-name-box">
          <img src={target.img} className="profile-picture" />
          <span className="name">
            <br />
            {target?.name}
            <br />
            {profile?.year}
            <br />
            {profile?.major}
            {ChatButton(isUser)}
          </span>
        </div>
        <div className="information-box">
          <p className="interests-row">
            {profile.interest ? "Interests:" : ""}
            <span className="interests">{profile?.interest}</span>
          </p>
          {profile?.house}
          {profile.floor ? "Floor: " + profile.floor : ""}
        </div>
        <div className="edit-button-div">
          <button className="edit-button" onClick={goToProfile}>
            Edit
          </button>
        </div>
        {EditButton(isUser)}
      </div>
    </div>
  );
}

ProfileBox.propTypes = {
  user: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
};

export default ProfileBox;
