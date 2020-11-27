const router = require('express').Router();
const {
    commentCtrl
} = require("../../../controllers/api");
router.post('/comment', commentCtrl.addComment);
router.get("/comment", commentCtrl.getAllComment);
router.get("/comment/:id",commentCtrl.getComment);
router.delete("/comment/:id",commentCtrl.deleteComment);


module.exports = router;