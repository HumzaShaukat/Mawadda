import React from "react";
import "../../styles/landing.css";
import fallInLove from "../../image/nbic.png";
import chat from "../../image/chat.jpg";
import connect from "../../image/connect.jpg";
import special from "../../image/special.jpg";

const LandingPage = () => {
  return (
    <div>
      <h1 className="title">
        <span className="speed">Mawadda</span>
      </h1>
      <p className="subtitle">New Brunswick Islamic Center </p>
      <div className="image-grid">
        <img
          className="image-grid-row-2 image-grid-col-2"
          src={fallInLove}
          alt="fallinlove"
        ></img>

        <img src={fallInLove} className="connect" alt="connecting"></img>

        <img src={fallInLove} className="special" alt="specialone"></img>

        <img
          src={fallInLove}
          className="image-grid-col-2 "
          alt="chatting"
        ></img>
      </div>
    </div>
  );
};

export default LandingPage;
