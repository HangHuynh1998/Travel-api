const mongoose = require('mongoose');
const Schema = require("mongoose").Schema;
const CommentSchema = new mongoose.Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    image:{type:String},
    status:{type:String,enum: ["open", "block"], default: "open"},
    title:{type:String},
    name:{type:String},
    comment:{type:String},
});

CommentSchema.statics.getMigrateData = function() {
    return dataMigrate;
  };

module.exports= mongoose.model("Comment", CommentSchema);