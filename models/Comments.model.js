const { Schema, model } = require('mongoose');

const commentsSchema = new Schema({
  comment_item: {
    type: ObjectId,
    ref: 'Item'
  },
  author: {
    type: ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now()
  },
});


const Comment = model('Comment', commentsSchema);

module.exports = Comment;

