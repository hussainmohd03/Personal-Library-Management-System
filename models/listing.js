const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
})

const List = mongoose.model("List", listingSchema)
module.exports = List