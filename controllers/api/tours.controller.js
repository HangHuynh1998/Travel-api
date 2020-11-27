const { tourService } = require("../../services");

const getAllTour = (req, res) => {
    tourService.getAllTour(req.query)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};

const getCategoryTours = (req, res) => {
    tourService.getCategoryTours(req.params.id, req.query)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};

const addTour = (req, res) => {
    tourService.addTour(req.user._id, req.body)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};

const getTourDetails = (req, res) => {
    tourService.getTourDetails(req.params.id)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};

const editTour = (req, res) => {
    tourService.editTour(req.params.id, req.user, req.body)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};

const deleteTour = (req, res) => {
    tourService.deleteTour(req.params.id)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
}

module.exports = {
    addTour,
    getAllTour,
    getCategoryTours,
    getTourDetails,
    editTour,
    deleteTour
};
