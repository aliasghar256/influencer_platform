const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    sequenceValue: { type: Number, default: 1 }
});

const influencerIDCounterModel = mongoose.model('influencerIDCounter', CounterSchema);

module.exports = influencerIDCounterModel;
