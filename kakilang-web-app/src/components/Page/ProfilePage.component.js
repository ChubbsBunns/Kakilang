import React from "react";
import PropTypes from "prop-types";
import "./ProfilePage.component.css";

/**
 * This renders a Profile Page.
 * As a Page, it will use up the space of the List and Box
 *
 */
function ProfilePage({ user }) {
  const profile = user.profile;
  return (
    <>
      <div className="container-profile-page">
        <div className="profile-box">
          <div className="image-name-box">
            <img src={user.img} className="profile-picture" />
            <span className="name">
              <br />
              {user?.name}
              <br />

              {profile?.year}
              <br />
              {profile?.major}
            </span>
          </div>
          <div className="information-box">
            <p className="interests-row">
              {profile?.interest ? "Interests:" : ""}
              <span className="interests">{profile?.interest}</span>
            </p>
            {profile?.house}
            <br />
            {profile?.floor}
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
