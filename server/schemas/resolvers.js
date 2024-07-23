//imports authentication error to call errors involving auth
const { AuthenticationError } = require("apollo-server-express");
//imports all models
const { User, Bio, Preference } = require("../models");
//imports sign token
const { signToken } = require("../utils/Auth");
//imports s3 bucket connection
const s3 = require("../config/s3config");
//imports gql upload for photo upload use
const { GraphQLUpload } = require("graphql-upload-minimal");

const resolvers = {
  Query: {
    //query for data of yourself as a user
    me: async (_parent, _args, context) => {
      //needs args unless you are passing an parameter as the args. Context is the third parameter
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //query for other user's bio data
    bios: async () => {
      return Bio.find().populate("userId");
    },
    //query for other users data
    users: async () => {
      return User.find();
    },
    //query for your bio data
    bio: async (_parent, args, context) => {
      if (context.user) {
        return await Bio.findOne({ userId: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //query for user preference data
    preference: async (_parent, args, context) => {
      if (context.user) {
        return await Preference.findOne({ userId: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  //query for a connections preference data
  Upload: GraphQLUpload,
  //object of mutations
  Mutation: {
    //mutation called to create a new user
    addUser: async (
      _parent,
      { firstName, lastName, email, password, isAdmin }
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        isAdmin,
      });
      const token = signToken(user);
      return { token, user };
    },
    //mutation called to login an existing user
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    //mutation for creating a user's bio data
    addBio: async (
      _parent,
      {
        age,
        gender,
        location,
        country,
        maritalStatus,
        ethnicity,
        education,
        college,
        major,
        company,
        job,
        criminalRecord,
        socials,
        picture,
        aspectsofFaith,
        timeline,
        bio,
      },
      context
    ) => {
      if (context.user) {
        const newBio = await Bio.create({
          userId: context.user._id,
          age,
          gender,
          location,
          country,
          maritalStatus,
          ethnicity,
          education,
          college,
          major,
          company,
          job,
          criminalRecord,
          socials,
          picture,
          aspectsofFaith,
          timeline,
          bio,
        });

        return newBio;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //mutation for creating a user's preference data
    addPreference: async (_parent, { ageMin, ageMax, location }, context) => {
      if (context.user) {
        const newPreference = await Preference.create({
          ageMin,
          ageMax,
          location,
          userId: context.user._id,
        });
        return newPreference;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //mutation to handle updating a user's existing bio data
    updateBio: async (
      _parent,

      {
        age,
        gender,
        location,
        country,
        maritalStatus,
        ethnicity,
        education,
        college,
        major,
        company,
        job,
        criminalRecord,
        socials,
        picture,
        aspectsofFaith,
        timeline,
        bio,
      },
      context
    ) => {
      if (context.user) {
        return await Bio.findOneAndUpdate(
          { userId: context.user._id },
          {
            $set: {
              age,
              gender,
              location,
              country,
              maritalStatus,
              ethnicity,
              education,
              college,
              major,
              company,
              job,
              criminalRecord,
              socials,
              picture,
              aspectsofFaith,
              timeline,
              bio,
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //mutation to handle updating a users existing preference data
    updatePreference: async (
      _parent,
      { ageMin, ageMax, location },
      context
    ) => {
      if (context.user) {
        return await Preference.findOneAndUpdate(
          { userId: context.user._id },
          { $set: { ageMin, ageMax, location } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //mutation to handle uploading photos to the configured s3 bucket from mongo/apollo
    uploadFile: async (_parent, { file }, context) => {
      if (context.user) {
        const { createReadStream, filename, mimetype, encoding } = await file;
        const { Location } = await s3
          .upload({
            Body: createReadStream(),
            Key: filename,
            ContentType: mimetype,
          })
          .promise();
        //pushes the user's uploaded picture to their bio data
        await Bio.findOneAndUpdate(
          { userId: context.user._id },
          { $push: { picture: Location } },
          { new: true }
        );
        return {
          filename,
          mimetype,
          encoding,
          url: Location,
        };
      }
    },
  },
};
//exports resolvers
module.exports = resolvers;
