/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

import EventCreationBox from "./Box/EventCreationBox.component";
import ProfileEditingBox from "./Box/ProfileEditingBox.component.js";

import { Button } from "@mui/material";
import { shadows } from "@mui/system";

/**
 * This functional component is used purely for testing purposes
 */
function TestFunction() {
  return <ProfileEditingBox />;
}

export default TestFunction;
