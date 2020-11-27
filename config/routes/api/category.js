const router = require("express").Router();

const { categotyCtrl } = require("../../../controllers/api");

router.get("/", categotyCtrl.getAllCategories);
router.get("/:id", categotyCtrl.getCategoryDetail);
module.exports = router