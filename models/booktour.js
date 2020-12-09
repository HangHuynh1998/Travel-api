const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookTourSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    tour_id: { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
    nameTour: {type:String},
    nameCustomer: {type:String},
    emailCustomer: {type:String},
    address: {type:String},
    phone: {type:Number},
    required:{type:String},
}, {
        timestamps: true,
    })

const dataMigrate = [];
BookTourSchema.statics.getMigrateData = function () {
    return dataMigrate;
}

module.exports = mongoose.model('BookTour', BookTourSchema);