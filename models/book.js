const mongoose = require('mongoose')

const borrowSchema = new mongoose.Schema({
  borrowerName: {
    type: String,
    required: true
  },
  borrowedAt: {
    type: Date,
    required: true
  },
  exReturnDate: {
    type: Date,
    required: true
  },
  returnedAt: {
    type: Date
  }
})

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    language: {
      type: String,
      enum: ['Arabic', 'English'],
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      enum: [
        'Fiction',
        'Non-Fiction',
        'Science-Fiction',
        'Fantasy',
        'Mystery',
        'Thriller',
        'Romance',
        'Historical',
        'Biography',
        'Self-Help',
        'Philosophy',
        'Poetry',
        'Horror',
        'Young-Adult',
        'Children',
        'Science',
        'Technology',
        'Religion',
        'Art',
        'Comics'
      ],
      required: true
    },
    isBorrowed: {
      type: Boolean,
      required: true,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isEbook: {
      type: Boolean,
      required: true,
      default: false
    },
    ebookPath: {
      type: String,
    },
    borrowHistory: [borrowSchema]
  },
  
  {
    timestamps: true // createdAt & updatedAt
  }
)

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
