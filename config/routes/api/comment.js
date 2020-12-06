const router = require('express').Router();
const {
    commentCtrl
} = require("../../../controllers/api");
const { jwtAuth, hasRole } = require("../../middleware");
router.post('/', jwtAuth, hasRole('customer'),commentCtrl.addComment);
router.get("/", commentCtrl.getAllComment);
router.put("/:id", jwtAuth, hasRole('customer'),commentCtrl.editComment);
router.delete("/:id",commentCtrl.deleteComment);

module.exports = router;