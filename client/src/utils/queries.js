import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser {
    me {
      _id
      username
      connections {
        _id
        username
      }
      connectRequest {
        _id
        username
      }
    }
  }
`;

export const QUERY_BIO = gql`
  query getBio {
    bio {
      _id
      bio
      interests
      userId
      age
      gender
      location
      pictures
    }
  }
`;

export const QUERY_PREFERENCE = gql`
  query getPreference {
    preference {
      _id
      ageMin
      ageMax
      sexOrientation
      gender
      location
      userId
    }
  }
`;

export const CONNECTION_PREFERENCE = gql`
  query getConnectionPref($userId: ID!) {
    connectionPreference(userId: $userId) {
      ageMin
      ageMax
      sexOrientation
      gender
      location
      userId
    }
  }
`;

export const CONNECTION_BIO = gql`
  query getConnectionBio($userId: ID!) {
    connectionBio(userId: $userId) {
      interests
      bio
      age
      gender
      location
      userId
      pictures
    }
  }
`;

export const QUERY_CONNECTION = gql`
  query getConnection($userId: ID!) {
    connection(userId: $userId) {
      _id
      username
    }
  }
`;

export const ALL_BIOS = gql`
  query getBios {
    bios {
      bio
      userId {
        username
        _id
      }
      age
      gender
      location
      pictures
    }
  }
`;

export const ALL_PROFILES = gql`
  query users {
    users {
      username
      _id
    }
  }
`;
