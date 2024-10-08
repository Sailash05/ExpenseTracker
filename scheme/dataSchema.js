const mongoose = require('mongoose');

const newSchema = mongoose.Schema({
    title: String,
    amount: Number,
    option: String,
    reference: String,
    typo: String
})

module.exports = mongoose.model("users",newSchema);