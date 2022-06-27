import React from "react";
import { Link } from "react-router-dom";

function NotMatch() {
  return (
    <div className="404NotFound">
      <Link to="/">
        <img
          src={"/404NotFound.png"}
          style={{
            "max-height": "none",
            "border-radius": "0",
            width: "100%",
            height: "100%",
          }}
        />
      </Link>
    </div>
  );
}

export default NotMatch;
