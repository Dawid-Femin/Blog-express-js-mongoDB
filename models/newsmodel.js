const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: String,
    description: String,
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', newsSchema);