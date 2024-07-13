import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LandingPage from "./pages/LandingPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard/index.js";
import Chat from "./pages/Chat/index.js";
import Profile from "./pages/ProfilePage";
import { createUploadLink } from "apollo-upload-client";
import InitBioPage from "./pages/bioForm/index.js";
import InitPreferencePage from "./pages/PreferenceTest/index.js";
import EditBio from "./pages/EditBio/index.js";
import UploadPicturePage from "./pages/PictureForm/index.js";
import Navigation from "./components/Nav/index.js";
import ProfileList from "./pages/ProfileList/index.js";
import Footer from "./components/Footer";

import { setContext } from "@apollo/client/link/context";
import EditPreference from "./pages/EditPreferenceForm/index.js";

// Construct request middleware that will attach the JWT token to every request as an `authorization` header.
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Construct our main GraphQL API endpoint
const httpLink = createUploadLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API.
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<SignupForm />} />
            <Route path="/test" element={<UploadPicturePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profiles" element={<ProfileList />} />
            <Route path="/newbio" element={<InitBioPage />} />
            <Route path="/newpref" element={<InitPreferencePage />} />
            <Route path="/editbio" element={<EditBio />} />
            <Route path="/editpreference" element={<EditPreference />} />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
