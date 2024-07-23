//imports schema and model
//used to build data structure
const { Schema, model } = require("mongoose");

//creates bio schema
const bioSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  ethnicity: { type: String, required: true },
  education: { type: String, required: true },
  college: { type: String, required: true },
  major: { type: String, required: true },
  company: { type: String, required: true },
  job: { type: String, required: true },
  criminalRecord: { type: Boolean, required: true },
  socials: { type: String, required: true },
  picture: { type: String, required: true },
  aspectsOfFaith: [{ type: String, required: true }],
  timeline: { type: String, required: true },
  bio: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
});

//sets the bio schema to a bio model
const Bio = model("Bio", bioSchema);

//exports the bio model
module.exports = Bio;
