const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    author: String,
    title: String,
    options: [{
        title: {type: String},
        vote: {type: Number, default: 0}
    }],
    voters: []
});

const Poll = mongoose.model('poll', pollSchema);

module.exports = Poll;