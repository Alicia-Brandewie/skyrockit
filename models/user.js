const mongoose = require("mongoose");

const applicationsSchema = new mongoose.Schema({
  company: {
    type: String,
    reqired: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  postingLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['interested', 'applied', 'interviewing','rejected','accepted'],
    required: true,
  },
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicationsSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
