//imports schema and model 
//used to build data structure
const { Schema, model } = require("mongoose");

//creates bio schema 
const bioSchema = new Schema({
  interests: [
    {
      type: String,
      required: true,
    },
  ],
  bio: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  pictures: [{ type: String }],
});

//sets the bio schema to a bio model
const Bio = model("Bio", bioSchema);

//exports the bio model
module.exports = Bio;
