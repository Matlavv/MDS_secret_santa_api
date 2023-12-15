const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        ref: 'User',
        required: true
    },
    members: [{
        type: String,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Group', groupSchema);
