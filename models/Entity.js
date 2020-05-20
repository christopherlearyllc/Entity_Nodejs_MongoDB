// models/Entity.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let entitySchema = new Schema({
    id: {
        type: Number,
        default: 0
    },
    value: {
        type: String,
    }
}, {
    collection: 'entity'
});

entitySchema.plugin(uniqueValidator, { message: 'Already in use.' });
entitySchema.plugin(autoIncrement.plugin, {
    model: 'entity',
    field: 'id',
    startAt: 1,
    increment: 1
});
module.exports = mongoose.model('Entity', entitySchema)