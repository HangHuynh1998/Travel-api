const router = require("express").Router();
// Controller
const { tourCtrl } = require("../../../controllers/api");
// Middleware
const {
    jwtAuth, hasRole
} = require('../../middleware');
router.post("/", jwtAuth, hasRole('company'), tourCtrl.addTour);
router.get("/", tourCtrl.getAllTour);
router.get("/toursale", tourCtrl.getTourSale);
router.get("/place", tourCtrl.getAllTourPlace);
router.get("/name", tourCtrl.getAllTourName);
router.get("/company", tourCtrl.getAllTourCompany);
router.get("/price", tourCtrl.getAllTourPrice);
router.get("/:id/category", tourCtrl.getCategoryTours);
router.get("/:id", tourCtrl.getTourDetails);
router.put("/:id", jwtAuth, hasRole('company'), tourCtrl.editTour);
router.delete("/:id", tourCtrl.deleteTour);

module.exports = router