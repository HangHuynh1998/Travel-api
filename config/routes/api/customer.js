const router = require('express').Router();

// Controller
const {
    customerCtrl
} = require("../../../controllers/api");

// Middleware
const {
    jwtAuth, hasRole
} = require('../../middleware');


router.get("/:id", customerCtrl.getCustomer);
router.get("/user_id/:id", customerCtrl.getCustomerUserid);
router.get("/", customerCtrl.getAllCustomer);
router.get("/detail/saved-tours", jwtAuth, hasRole('customer'), customerCtrl.getAllSavedTours);
router.put("/detail/saved-tours/:tour_id", jwtAuth, hasRole('customer'), customerCtrl.toggleSavedTour);
router.get("/detail/applied-tours", jwtAuth, hasRole('customer'), customerCtrl.getAppliedTour);
// APPLICATIONS
router.get("/detail/my-applications", jwtAuth, hasRole('customer'), customerCtrl.getCustomerApplications);
router.get("/detail/followed-companies", jwtAuth, hasRole('customer'), customerCtrl.getFollowedCompany);
router.get("/detail/followed-companies-tours", jwtAuth, hasRole('customer'), customerCtrl.getFollowedCompanyTour);
router.put("/detail/followed-companies/:company_id", jwtAuth, hasRole('customer'), customerCtrl.toggleFollowCompany);

module.exports = router;
