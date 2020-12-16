const { Schema, model } = require("mongoose");

const itemsSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    // enum: [
    //   "Travel",
    //   "Self-Improvement",
    //   "Relationships",
    //   "Career",
    //   "Education",
    //   "Food",
    //   "Finance",
    //   "Entertainment",
    //   "Adventure",
    // ],
  },
  title: String,
  image: {
    type: String,
    default: "Will come",
  },
  public: Boolean,
  pending: Boolean,
  description: String,
  like: [],
});

const Item = model("Item", itemsSchema);

module.exports = Item;
