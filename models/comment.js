const mongoose = require('mongoose');
const Schema = require("mongoose").Schema;
const CommentSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tour_id: { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
    image:{type:String},
    status:{type:Boolean,default:true},
    nameWriter:String,
    comment:String,
});

CommentSchema.statics.getMigrateData = function() {
    return dataMigrate;
  };

module.exports= mongoose.model("Comment", CommentSchema);