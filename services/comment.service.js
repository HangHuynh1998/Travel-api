const Comment = require("../models/comment");
const { getUser } = require('./users.service');

const getComment = async id=>{
  let data= await Comment.find({id_news:id}).sort({ createDay: -1 })
  for (let i = 0; i < data.length; i++) {
    if(data[i].id_account) {
      const userInfo = await getUser(data[i].id_account)
      if(userInfo.avatar){
        data[i] = {
        ...data[i]._doc, avatar : userInfo.avatar
        }
      }
    }
  } 
  return data ;
  };



const postComment = async data => { 
  const comments = new Comment(data);
  return await comments.save();
  };

  module.exports = {

    getComment,
    postComment

  
  };