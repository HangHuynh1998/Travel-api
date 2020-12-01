const router = require('express').Router();

// Middleware
const { uploadMedia, jwtAuth } = require("../../middleware");

// controller
const {
    userCtrl
} = require("../../../controllers/api");

router.get("/", jwtAuth, userCtrl.getAllUsers);
router.get("/detail", jwtAuth, userCtrl.getUser);
router.put('/update', jwtAuth, uploadMedia.fields([
    { name: 'avatar', maxCount: 1 },
]), userCtrl.updateUser);
router.put('/change-password', jwtAuth, userCtrl.changePassword);

module.exports = router;
