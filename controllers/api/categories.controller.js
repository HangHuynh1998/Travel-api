const { categoryService } = require("../../services");

const getAllCategories = (req, res) => {
    categoryService.getAllCategories()
    .then(data => {
        res.sendData(data);
    })
    .catch(err => {
        res.sendError(err.message);
    })
};

const getCategoryDetail = (req, res) => {
    categoryService.getCategoryDetail(req.params.id)
    .then(data => {
        res.sendData(data);
    })
    .catch(err => {
        res.sendError(err.message);
    })
};

module.exports = {
    getAllCategories,
    getCategoryDetail,
};
