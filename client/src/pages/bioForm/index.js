import React from "react";
import InitBioForm from "../../components/BioInputTest";
import auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const InitBioPage = () => {
  const navigate = useNavigate();
  if (!auth.loggedIn()) {
    navigate("/login");
  } else {
    return (
      <div>
        <h1 className="text-center"> Create your Bio</h1>
        <InitBioForm />
      </div>
    );
  }
};

export default InitBioPage;
