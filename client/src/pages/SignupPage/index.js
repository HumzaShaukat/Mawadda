import React from "react";
import LoginForm from "../../components/login";
import SignupForm from "../../components/signup";
import loginImage from "../../image/phoneMatch.jpg";
import "../../styles/signupPage.css";

const SignupPage = () => {
  return (
    <div>
      <h1 className="text-center"> Signup or Login</h1>
      <div className="d-flex justify-content-center formandImage">
        <div className="col-lg-5 bothForms col-md-6">
          <LoginForm />
          <SignupForm />
        </div>
        <div className="col-lg-5 col-md-6 imageContainer">
          <img
            src={loginImage}
            alt="dating app photo"
            className="loginImage"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
