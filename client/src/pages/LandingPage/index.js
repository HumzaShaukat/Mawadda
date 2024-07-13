import React from "react";
import "../../styles/landing.css";
import fallInLove from "../../image/fallinlove.jpg";
import chat from "../../image/chat.jpg";
import connect from "../../image/connect.jpg";
import special from "../../image/special.jpg";

const LandingPage = () => {
  return (
    <div>
      <h1 className="title">
        <span className="speed">Speed</span>Dater
      </h1>
      <p className="subtitle">
        Fall in Love, Make Connections, Meet and Chat with Someone Special{" "}
      </p>
      <div className="image-grid">
        <img
          className="image-grid-row-2 image-grid-col-2"
          src={fallInLove}
          alt="fallinlove"
        ></img>

        <img src={connect} className="connect" alt="connecting"></img>

        <img src={special} className="special" alt="specialone"></img>

        <img src={chat} className="image-grid-col-2 " alt="chatting"></img>
      </div>
    </div>
  );
};

export default LandingPage;
