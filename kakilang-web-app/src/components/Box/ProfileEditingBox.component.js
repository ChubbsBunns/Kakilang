import React from "react";
import "./ProfileEditingBox.component.css";

import imageTest from "./Dylan-img1.png";

import Avatar from "@mui/material/Avatar";

/**
 * Profile Editing Box
 *
 *
 *
 * @component
 */

function ProfileEdit() {
  return (
    <div className="editing-box-component">
      <div className="filler"></div>
      <div className="filler"></div>
      <div className="editing-box">
        <Avatar alt="Profile Image Failed to Load" src={imageTest}></Avatar>
      </div>
    </div>
  );
}

export default ProfileEdit;
