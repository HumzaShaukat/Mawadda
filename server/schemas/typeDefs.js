//imports gql from apollo
const { gql } = require("apollo-server-express");

//creates object of all typedefs for each model, queries, and mutations
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    connections: [User]
    connectRequest: [User]
  }
  type Bio {
    _id: ID!
    interests: [String]!
    bio: String
    age: Int
    gender: String
    location: String
    userId: ID!
    pictures: [String]
  }
  type Bios {
    _id: ID!
    interests: [String]!
    bio: String
    age: Int
    gender: String
    location: String
    userId: User
    pictures: [String]
  }
  type Preference {
    _id: ID!
    ageMin: Int!
    ageMax: Int!
    sexOrientation: String!
    gender: String!
    location: String!
    userId: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type Query {
    bios: [Bios]
    bio: Bio
    preferences: [Preference]
    preference: Preference
    me: User
    connection(userId: ID!): User
    users: [User]
    connectionBio(userId: ID!): Bio
    connectionPreference(userId: ID!): Preference
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addConnection(userId: ID!): User
    acceptConnection(userId: ID!): User
    deleteConnectionRequest(userId: ID!): User
    deleteConnection(userId: ID!): User

    addBio(
      interests: [String]!
      bio: String!
      age: Int!
      gender: String!
      location: String!
      pictures: String
    ): Bio

    updateBio(
      interests: [String]
      bio: String
      location: String
      age: Int
      gender: String
    ): Bio

    addPreference(
      ageMin: Int!
      ageMax: Int!
      sexOrientation: String!
      gender: String!
      location: String!
    ): Preference

    updatePreference(
      ageMin: Int
      ageMax: Int
      sexOrientation: String
      gender: String
      location: String
    ): Preference

    uploadFile(file: Upload!): File
  }
`;

module.exports = typeDefs;
