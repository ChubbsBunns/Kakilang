import React from "react";
import Logo from "./images/KakilangLogo.png";

/**
 * Big Logo
 *
 *
 *
 * @component
 */
function BigLogo() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/" className="App-link">
          {" "}
          <h1>
            {" "}
            <img src={Logo}></img>
          </h1>{" "}
        </a>
      </header>
    </div>
  );
}

export default BigLogo;
