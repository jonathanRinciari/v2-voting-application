const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    author: String,
    title: String,
    options: [],
    voters: []
});

const Poll = mongoose.model('poll', pollSchema);

module.exports = Poll;