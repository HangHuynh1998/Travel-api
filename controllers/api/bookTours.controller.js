const { booktTourService } = require("../../services");

const sendMailBookTour = async (req, res) => {
    const { 
        tour_id,
        emailcompany,
        nameCompany,
        nameTour,
        nameCustomer,
        emailCustomer,
        address,
        phone,
        required } = req.body;

    await booktTourService.sendMailApplyTour(
        tour_id,
        emailcompany,
        nameCompany,
        nameTour,
        nameCustomer,
        emailCustomer,
        address,
        phone,
        required)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
}

const addBookTour = (req, res) => {
    booktTourService.addApplication(req.user._id, {
        ...req.body,
        // file: req.file
    })
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};

const getBookTourDetails = (req, res) => {
    booktTourService.getApplicationDetails(req.params.id)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};

const getAllBookTour = (req, res) => {
    booktTourService.getAllApplications()
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};

module.exports = {
    addBookTour,
    getAllBookTour,
    getBookTourDetails,
    sendMailBookTour
};
