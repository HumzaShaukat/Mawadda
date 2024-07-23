//imports gql from apollo
const { gql } = require("apollo-server-express");

//creates object of all typedefs for each model, queries, and mutations
const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }
  type Bio {
    _id: ID!
    age: Int!
    gender: String!
    location: String!
    country: String!
    maritalStatus: String!
    ethnicity: String!
    education: String!
    college: String!
    major: String!
    company: String!
    job: String!
    criminalRecord: Boolean!
    socials: String!
    aspectsOfFaith: [String!]
    timeline: String!
    userId: ID!
    picture: [String!+]
  }
  type Bios {
    _id: ID!
    age: Int!
    gender: String!
    location: String!
    country: String!
    maritalStatus: String!
    ethnicity: String!
    education: String!
    college: String!
    major: String!
    company: String!
    job: String!
    criminalRecord: Boolean!
    socials: String!
    aspectsOfFaith: [String!]
    timeline: String!
    userId: ID!
    picture: [String!]
  }
  type Preference {
    _id: ID!
    ageMin: Int!
    ageMax: Int!
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
    users: [User]
  }
  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth

    delUser(

    )
    login(email: String!, password: String!): Auth

    addBio(
      _id: ID!
      age: Int!
      gender: String!
      location: String!
      country: String!
      maritalStatus: String!
      ethnicity: String!
      education: String!
      college: String!
      major: String!
      company: String!
      job: String!
      criminalRecord: Boolean!
      socials: String!
      aspectsOfFaith: [String!]
      timeline: String!
      picture: [String!]
      userId: ID!
    ): Bio

    updateBio(
      age: Int
      gender: String
      location: String
      country: String
      maritalStatus: String
      ethnicity: String
      education: String
      college: String
      major: String
      company: String
      job: String
      criminalRecord: Boolean
      socials: String
      aspectsOfFaith: [String]
      timeline: String
      picture: [String]
    ): Bio

    addPreference(
      ageMin: Int!
      ageMax: Int!
      location: String!
    ): Preference

    updatePreference(
      ageMin: Int
      ageMax: Int
      location: String
    ): Preference

    uploadFile(file: Upload!): File
  }
`;

module.exports = typeDefs;
