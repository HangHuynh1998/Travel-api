const router = require('express').Router();
const {
    contactCtrl
} = require("../../../controllers/api");
router.post('/send-refer-friend', contactCtrl.sendReferFriendMail);


module.exports = router;