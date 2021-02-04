const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "no photo",
  },
  postedBy: {
    type: ObjectId,
    ref: "userModel",
  },
});

mongoose.model("postModel", postSchema);
