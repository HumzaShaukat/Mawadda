//imports schema and model 
//used to build data structure
const { Schema, model } = require("mongoose");

//creates the preference schema 
const preferenceSchema = new Schema({
    ageMin: {
        type: Number,
        required: true,
    },
    ageMax: {
        type: Number,
        required: true,
    },
    sexOrientation: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

//creates model out of preference schema
const Preference = model("Preference", preferenceSchema);

//exports preference model
module.exports = Preference;