const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String
    }
  },
  {
    timestamps: true // createdAt & updatedAt
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
