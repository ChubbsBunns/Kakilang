import React from "react";
import { Outlet } from "react-router";
import "../Box/EmptyBox.component.css";

/**
 * This represents an empty box component
 */
function EmptyList() {
  return (
    <>
      <div className="Empty"></div>
      <Outlet></Outlet>
    </>
  );
}

export default EmptyList;
