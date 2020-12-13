const { Schema, model } = require("mongoose");

const itemsSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    enum: [
      "Travel",
      "Self-Improvment",
      "Relationships",
      "Career",
      "Education",
      "Food",
      "Finance",
      "Entertainment",
      "Adventure"
    ],
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
