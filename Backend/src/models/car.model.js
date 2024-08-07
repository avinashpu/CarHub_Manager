const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CarSchema = new mongoose.Schema({
    S_NO : {type: Number},
    carName: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    price: { type: Number, required: true },
    carImage: {
        type: String,

    },
});
CarSchema.plugin(AutoIncrement, { inc_field: ' S_NO' });
module.exports = mongoose.model('Car', CarSchema);
