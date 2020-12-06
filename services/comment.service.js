const Comment = require("../models/comment");
const Customer = require("../models/customer");
const { updateDocument } = require("../utils/updateDocument");

const getAllComments = (filter) => {
  let query = {};
  console.log(query)
  let pageIndex = filter.page ? Number(filter.page) - 1 : 0;
  let perPage = filter.limit ? Number(filter.limit) : 1000;
  let sortBy = filter.sort ? filter.sort : "title";
  let sortType = filter.typeOfSort ? (filter.typeOfSort == "inc" ? 1 : -1) : 1;
  return new Promise((resolve, reject) => {
      Comment.find(query)
          .sort([[sortBy, sortType]])
          .skip(pageIndex * perPage)
          .limit(perPage)
          .populate({
              path: "customer_id",
              populate: {
                  path: "user_id",
                  model: "User",
                  select: { 'password': 0 }
              }
          })
          .then(doc => {
              if (doc == null) throw new Error("Comments not found !");
              resolve(doc);
          })
          .catch(err => {
              reject(err);
          })
  })
}



  const addComment = (customer_id, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customer= await Customer.findById(customer_id);
            if (!customer) {
                return reject({ message: "Only customer can post a review" });
            } else {
                let data = {
                    customer_id: customer_id,
                    name: body.name,
                    image: body.image,
                    comment: body.comment,
                }
                let comment = new Comment(data);
                await comment.save();
                return resolve("Successful")
            }
        } catch (error) {
            return reject(error)
        }
    })
}
const editComment= (id, user, body) => {
  return new Promise(async (resolve, reject) => {
      try {
          let comment = await Comment.findById(id);
          if (!comment) throw new Error("Comment not found !");
          if (user._id.toString() === comment.customer_id.toString()) {
              await updateDocument(comment, Comment, body, ["customer_id"]);
              await comment.save();
              return resolve(comment);
          } else {
              return reject({ message: "Permission denied !" });
          }
      } catch (err) {
          return reject(err);
      }
  })
}

const deleteComment = (id) => {
  return new Promise( async (resolve, reject) => {
      let comment = await Comment.findById(id);
      let customer = await Customer.findById(comment.customer_id);
      Comment.findOneAndDelete({ _id: id }, async (err, doc) => {        
          if (doc == null) return reject({ message: "Comment not found !" });
          if (err) {
              reject(err);
          } else {
              // company.available_jobs--;
              // await company.save();
              resolve("Delete tour successfully");
          };
      })
  })
}
  module.exports = {

    getAllComments,
    addComment,
    editComment,
    deleteComment

  
  };