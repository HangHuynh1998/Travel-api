const router = require("express").Router();

const { companyCtrl } = require("../../../controllers/api");

// Middleware
const {
    jwtAuth, hasRole
} = require('../../middleware');

router.get("/:id/tours", companyCtrl.getCompanyTours);
router.get("/booktour/:tour_id", jwtAuth, hasRole('company'), companyCtrl.getTourApplications);
router.get("/", companyCtrl.getAllCompany);
router.get("/:id", companyCtrl.getCompanyDetails);
router.get("/user_id/:id", companyCtrl.getCompany);

module.exports = router