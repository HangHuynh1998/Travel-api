const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookTourSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    tour_id: { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
    bookDate:{ type: Date , required: true },
    startDate: { type: Date , required: true },
    numberOf:{ type: Number, required: true,default: 0 },
    isHotel:{ type: Boolean, required: true },
    requirement: { type: String},
}, {
        timestamps: true,
    })

const dataMigrate = [];
BookTourSchema.statics.getMigrateData = function () {
    return dataMigrate;
}

module.exports = mongoose.model('BookTour', BookTourSchema);