const { Schema, model } = require("mongoose");

const commentsSchema = new Schema({
  comment_item: {
    type: Schema.Types.ObjectId,
    ref: "Items",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  commentText: {
    type: String,
  },
});

const Comment = model("Comment", commentsSchema);

module.exports = Comment;
