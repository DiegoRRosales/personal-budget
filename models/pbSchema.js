const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    budget: {
        type: Number,
        required: true
    },
    background: {
        type: String,
        required: true,
        unique: true
    }
}, {collection: 'personalbudget'})

module.exports = mongoose.model('personalbudget', budgetSchema)