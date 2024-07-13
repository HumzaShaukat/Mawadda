import React from "react";
import { useQuery } from "@apollo/client";
import EditPreferenceForm from "../../components/editPreference";
import { QUERY_PREFERENCE } from "../../utils/queries";
import auth from "../../utils/auth";
import "../../styles/bioform.css";
import { useNavigate } from "react-router-dom";
import SignupPage from "../SignupPage";

const EditPreference = () => {
  const { loading: preferenceLoading, data: preferenceData } =
    useQuery(QUERY_PREFERENCE);

  const myPreference = preferenceData?.preference || {};

  const navigate = useNavigate();
  if (!auth.loggedIn()) {
    navigate("/login");
    return <SignupPage />;
  } else {
    if (preferenceLoading) {
      return <div> Loading...</div>;
    }
    return (
      <div>
        <h1 className="editHeading"> Edit Your Preferences</h1>

        <div>
          <EditPreferenceForm myPreference={myPreference} />
        </div>
      </div>
    );
  }
};

export default EditPreference;
