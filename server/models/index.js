//imports all data models and sets them to consts
const User = require("./User");
const Bio = require("./Bio");
const Preference = require("./Preference");
//just incase we need a model
const Image = require("./Image");

//exports all models
module.exports = { User, Bio, Preference, Image };
