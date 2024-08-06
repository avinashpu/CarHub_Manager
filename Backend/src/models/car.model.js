const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    carName: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Car', CarSchema);
