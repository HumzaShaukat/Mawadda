import React from "react";
import auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import SignupPage from "../SignupPage";

const Chat = () => {
  const navigate = useNavigate();
  const handleConnectBtn = async () => {};

  const handleEndChat = async () => {};

  const handleNextChat = async () => {};

  if (!auth.loggedIn()) {
    navigate("/login");
    return <SignupPage />;
  } else {
    return (
      <div>
        <div className="chatPage">
          <div className="actions">
            <button className="btn connectBtn">Connect</button>
            <button className="btn endBtn">End Chat</button>
            <button className="btn nextChatBtn">New Chat</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Chat;
