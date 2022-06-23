/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Logout from "./Logout.component";

/**
 * This functional component is used purely for testing purposes
 */
function TestFunction() {
  const getCurrentUser = () => {
    return {
      email: localStorage.getItem("email"),
      name: localStorage.getItem("name"),
      profileIMG: localStorage.getItem("img"),
    };
  };
  const [login, setLogin] = useState(getCurrentUser());

  return (
    <>
      <Logout />
      {Object.entries(login).map(([k, v]) => {
        return (
          <p key={k}>
            {k}: {v}
          </p>
        );
      })}
    </>
  );
}

export default TestFunction;
