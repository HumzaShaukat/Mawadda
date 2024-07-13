//imports schema and model 
//used to build data structure
const { Schema, model } = require("mongoose");

//creates image schema 
var imageSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

//sets the image schema to an image model
const Image = model("Image", imageSchema);

//exports image model
module.exports = Image;
