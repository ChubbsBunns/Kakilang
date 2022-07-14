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
          <img src={Logo}></img>{" "}
        </a>
      </header>
    </div>
  );
}

export default BigLogo;
