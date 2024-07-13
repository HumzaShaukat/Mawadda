//imports mongoose
const mongoose = require("mongoose");

//establishes mongoose connection to db
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/speeddater",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//exports the connection for mongoose to be used
module.exports = mongoose.connection;
