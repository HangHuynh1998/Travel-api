const router = require('express').Router();

const {
    uploadMedia
} = require('../../middleware');
const {
    authCtrl
} = require("../../../controllers").apiCrtl;

router.post("/login", authCtrl.login);

router.get("/profile", authCtrl.getProfile);

router.post("/register/company", uploadMedia.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 }
]), authCtrl.register('company'));

router.post("/register/customer", authCtrl.register("customer"));
router.post("/forgot-password", authCtrl.forgotPassword);
router.post("/reset-password", authCtrl.resetPassword);
router.post("/check-email", authCtrl.checkEmailAvailable);
module.exports = router;