const router = require('express').Router();

// Middleware
const { uploadMedia, jwtAuth } = require("../../middleware");

// controller
const {
    userCtrl
} = require("../../../controllers/api");

router.get("/", userCtrl.getAllUsers);
router.get("/detail", jwtAuth, userCtrl.getUser);
router.put('/update', jwtAuth, userCtrl.updateUser);
router.put('/change-password', jwtAuth, userCtrl.changePassword);
router.delete('/:id', userCtrl.deleteUser)
module.exports = router;
