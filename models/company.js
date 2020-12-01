const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompaniesSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Categories'},
    tour_id: { type: Schema.Types.ObjectId, ref: 'Tour'},
    numberTour: { type: Number, default: 0 },
    name: { type: String },
    description: {type:String}
  },
  {
    timestamps: true
  }
);

const dataMigrate = [];

CompaniesSchema.statics.getMigrateData = function () {
  return dataMigrate;
};

module.exports = mongoose.model("Companies", CompaniesSchema);
