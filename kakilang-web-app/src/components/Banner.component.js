import React from "react";
import "./Banner.component.css"
import kakilang_logo from "./images/KakilangLogo.png";
import friend1 from "./images/friends1.png";
import friend2 from "./images/friends2.png";
import friend3 from "./images/friends3.png";
import friend4 from "./images/friends4.png";
/**
 * Banner
 * Showcases the logo and a bit of deco to show that you are on the home page
 *
 *
 * @component
 */

function Banner(){
    return (
        <div className="title" id="banner-text">
        <img src={kakilang_logo} className="kakilang-logo-img" />
        <img src={friend1} className="friend-img" />
        <img src={friend2} className="friend-img" />
        <img src={friend3} className="friend-img" />
        <img src={friend4} className="friend-img" />
      </div>
    )
}

export default Banner;