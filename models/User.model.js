const { Schema, model } = require("mongoose");
// const url = require('../public/images/default-picture_0_0.png');
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  image: {
    type: String,
    // default: url
  },
  inspiration: [],
  inspired: [],
  // timestamps: true,
});

const User = model("User", userSchema);

module.exports = User;
