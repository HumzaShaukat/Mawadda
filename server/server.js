//import express
const express = require("express");
//imports dotenv to protect sensitive connection info
require("dotenv").config();
//imports apollo server for routing
const { ApolloServer } = require("apollo-server-express");
//imports graphql upload routing tools
const {
  GraphQLUpload,
  graphqlUploadExpress,
} = require("graphql-upload-minimal");
const path = require("path");
//imports auth middleware
const { authMiddleware } = require("./utils/Auth");
const { typeDefs, resolvers } = require("./schemas");
//imports connection to database
const db = require("./config/connection");
//sets port to listen locally at 3001
const PORT = process.env.PORT || 3001;
const app = express();
//establishes apolloserver to use the defined typedefs, resolvers, and auth middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema.
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  //opens connection to db and port
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
