const router = require("express").Router();
// Middleware
const { uploadMedia, jwtAuth, hasRole } = require("../../middleware");

const { bookTourCtrl } = require("../../../controllers/api");

router.post("/", jwtAuth, hasRole('customer'), bookTourCtrl.addBookTour);
router.get("/", bookTourCtrl.getAllBookTour);
router.get("/:id", jwtAuth, bookTourCtrl.getBookTourDetails);
router.post('/apply-job', bookTourCtrl.sendMailBookTour);
module.exports = router