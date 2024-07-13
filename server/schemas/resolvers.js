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
        return User.findOne({ _id: context.user._id })
          .populate({ path: "connections", select: "-__V" })
          .populate({ path: "connectRequest", select: "-__V" });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  //query for a user connection
    connection: async (_parent, { userId }, context) => {
      if (context.user) {
        return User.findOne({ _id: userId });
      }
      throw new AuthenticationError(
        "You need to be logged in to view another profile!"
      );
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
//query for bio data from a potential connection
    connectionBio: async (_parent, { userId }, context) => {
      if (context.user) {
        return Bio.findOne({ userId: userId });
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
//query for a connections preference data
    connectionPreference: async (_parent, { userId }, context) => {
      if (context.user) {
        return await Preference.findOne({ userId: userId });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Upload: GraphQLUpload,
  //object of mutations
  Mutation: {
    //mutation called to create a new user
    addUser: async (_parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
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
      { interests, bio, age, gender, location, pictures },
      context
    ) => {
      if (context.user) {
        const newBio = await Bio.create({
          interests,
          bio,
          userId: context.user._id,
          age,
          gender,
          location,
          pictures,
        });

        return newBio;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
//mutation for creating a user's preference data
    addPreference: async (
      _parent,
      { ageMin, ageMax, sexOrientation, gender, location },
      context
    ) => {
      if (context.user) {
        const newPreference = await Preference.create({
          ageMin,
          ageMax,
          sexOrientation,
          gender,
          location,
          userId: context.user._id,
        });
        return newPreference;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //mutation for creating a user connection request
    addConnection: async (_parent, { userId }, context) => {
      if (context.user) {
        const addConnection = await User.findOneAndUpdate(
          { _id: userId },
          {
            $push: { connectRequest: context.user._id },
          },
          { new: true }
        );
        return addConnection;
      }
      throw new AuthenticationError(
        "You need to be logged in to add a connection"
      );
    },
    //mutation for accepting a user connection request
    acceptConnection: async (_parent, { userId }, context) => {
      if (context.user) {
        //adds the user connection to one user upon request acceptance
        const newConnect = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { connections: userId } },
          { new: true }
        );
        //adds the user connection to the other user upon request acceptance
        const newConnect2 = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { connections: context.user._id } },
          { new: true }
        );
        //removes the request because it was handled and no longer needed
        const deleteRequest = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { connectRequest: userId } },
          { new: true }
        );
        //returns both users data with their updated new connection to eachother and the request has been resolved and removed
        return {
          newConnect,
          newConnect2,
          deleteRequest,
        };
      }
      throw new AuthenticationError(
        "You need to be logged in to edit connections"
      );
    },
    //mutation to handle a user denying another user's connection request
    deleteConnectionRequest: async (_parent, { userId }, context) => {
      if (context.user) {
        const deleteConnectionRequest = await User.findOneAndUpdate(
          { _id: context.user._id },
          //connect request is removed 
          {
            $pull: { connectRequest: userId },
          },
          { new: true }
        );
        return deleteConnectionRequest;
      }
      throw new AuthenticationError(
        "You need to be logged in to edit connections"
      );
    },
    //mutation to handle deleting an existing user connection
    deleteConnection: async (_parent, { userId }, context) => {
      if (context.user) {
        //removes the connection between users from first user
        const delConnection1 = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { connections: userId },
          },
          { new: true }
        );
        //removes the connection between users for second user
        const delConnection2 = await User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: { connections: context.user._id },
          },
          { new: true }
        );
        //returns both users updated connection data where they are no longer connected
        return {
          delConnection1,
          delConnection2,
        };
      }
      throw new AuthenticationError(
        "You need to be logged in to edit connections"
      );
    },
    //mutation to handle updating a user's existing bio data 
    updateBio: async (
      _parent,

      { interests, bio, age, gender, location, pictures },
      context
    ) => {
      if (context.user) {
        return await Bio.findOneAndUpdate(
          { userId: context.user._id },
          { $set: { interests, bio, age, gender, location, pictures } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //mutation to handle updating a users existing preference data
    updatePreference: async (
      _parent,
      { ageMin, ageMax, sexOrientation, gender, location },
      context
    ) => {
      if (context.user) {
        return await Preference.findOneAndUpdate(
          { userId: context.user._id },
          { $set: { ageMin, ageMax, sexOrientation, gender, location } },
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
          { $push: { pictures: Location } },
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
