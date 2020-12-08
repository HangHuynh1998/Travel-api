const mongoose = require('mongoose');
const Schema = require("mongoose").Schema;
const CommentSchema = new mongoose.Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    image:{type:String,required: true},
    status:{type:String,enum: ["open", "block"], default: "open"},
    title:{type:String,required: true},
    name:{type:String,required: true},
    comment:{type:String,required: true},
});

CommentSchema.statics.getMigrateData = function() {
    return dataMigrate;
  };

module.exports= mongoose.model("Comment", CommentSchema);