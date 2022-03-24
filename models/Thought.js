const { Schema, model, Types } = require("mongoose");

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
      type: Date,
      default: Date.now,
      
  }
});

module.exports = Thought;
