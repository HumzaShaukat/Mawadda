import React from "react";
import { useQuery } from "@apollo/client";
import EditBioForm from "../../components/BioInputEdit";
import { QUERY_BIO } from "../../utils/queries";
import auth from "../../utils/auth";
import "../../styles/bioform.css";
import { useNavigate } from "react-router-dom";
import SignupPage from "../SignupPage";

const EditBio = () => {
  const { loading: bioLoading, data: bioData } = useQuery(QUERY_BIO);

  const myBio = bioData?.bio || {};

  const navigate = useNavigate();
  if (!auth.loggedIn()) {
    navigate("/login");
    return <SignupPage />;
  } else {
    if (bioLoading) {
      return <div> Loading...</div>;
    }
    return (
      <div>
        <h1 className="editHeading"> Edit Your Bio</h1>

        <div>
          <EditBioForm myBio={myBio} />
        </div>
      </div>
    );
  }
};

export default EditBio;
