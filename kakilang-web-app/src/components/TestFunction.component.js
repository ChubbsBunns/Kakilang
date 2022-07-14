/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

import EventCreationBox from "./Box/EventCreationBox.component";

import DylanTest from "./DylanTest.component.js";

import { Button } from "@mui/material";
import { shadows } from "@mui/system";

/**
 * This functional component is used purely for testing purposes
 */
function TestFunction() {
  {
    /** 
  return <EventCreationBox />;
*/
  }
  return (
    <div className="ComponentStuff">
      <p>tesgfgrfe</p>
      <Button
        variant="contained"
        sx={{
          width: 1000,
          boxShadow: 4,
        }}
      >
        Hello
      </Button>
    </div>
  );
}

export default TestFunction;
