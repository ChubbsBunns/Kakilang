import React from "react";
import PropTypes from "prop-types";
import "./ProfilePage.component.css";

/**
 * This renders a Profile Page.
 * As a Page, it will use up the space of the List and Box
 *
 */
function ProfilePage({ user }) {
  return (
    <>
      <div className="container-profile-page">
        <div className="profile-box">
          <div className="image-name-box">
            <img src={user.profileIMG} className="profile-picture" />
            <span className="name">
              <br />
              {user?.name}
              <br />

              {user.profile?.year?.value}
              <br />
              {user.profile?.major?.value}
            </span>
          </div>
          <div className="information-box">
            <p className="interests-row">
              {user?.profile?.interest ? "Interests:" : ""}
              <span className="interests">{user.profile?.interest}</span>
            </p>
            {user.profile?.house?.value}
            {user.profile?.floor?.value}
          </div>
          <div className="edit-button-div">
            <button className="edit-button">Edit</button>
          </div>
        </div>
      </div>
    </>
  );
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfilePage;
