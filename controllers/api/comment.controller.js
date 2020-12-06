const commentService = require("../../services/comment.service");
const customerService = require("../../services/customer.service");



const getAllComment = (req, res) => {
    commentService.getAllComments(req.query)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};
const addComment = (req, res) => {
    commentService.addComment(req.user._id, req.body)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};
const deleteComment = (req, res) => {
    commentService.deleteComment(req.params.id)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
}
const editComment = (req, res) => {
    commentService.editComment(req.params.id, req.user, req.body)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};
module.exports = {
    addComment,
    getAllComment,
    editComment,
    deleteComment
};  