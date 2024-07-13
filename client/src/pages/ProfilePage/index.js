import React from "react";
import { useQuery } from "@apollo/client";
import MyProfile from "../../components/Profile";
import { useParams } from "react-router-dom";
import auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import SignupPage from "../SignupPage";

import {
  CONNECTION_BIO,
  CONNECTION_PREFERENCE,
  QUERY_CONNECTION,
} from "../../utils/queries";

const Profile = () => {
  const userId = useParams().id;
  const { loading: bioLoading, data: bioData } = useQuery(CONNECTION_BIO, {
    variables: { userId },
  });
  const { loading: userLoading, data: userData } = useQuery(QUERY_CONNECTION, {
    variables: { userId },
  });
  const { loading: preferenceLoading, data: preferenceData } = useQuery(
    CONNECTION_PREFERENCE,
    {
      variables: { userId },
    }
  );

  const myBio = bioData?.connectionBio || {};
  const myUser = userData?.connection || {};
  const myPreference = preferenceData?.connectionPreference || {};

  const navigate = useNavigate();
  if (!auth.loggedIn()) {
    navigate("/login");
    return <SignupPage />;
  } else {
    if (bioLoading || preferenceLoading || userLoading) {
      return <div> Loading...</div>;
    }
    return (
      <div>
        <div>
          <MyProfile
            myBio={myBio}
            myUser={myUser}
            myPreference={myPreference}
          />
        </div>
      </div>
    );
  }
};

export default Profile;
