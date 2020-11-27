const { booktTourService } = require("../../services");

const sendMailBookTour = async (req, res) => {
    const {emailCompany,nameCompany,name,gender, birthday ,address,emailCustomer,phone,startDate,numberOf,isHotel,requirement,tour_id,message } = req.body;

    await booktTourService.sendMailApplyTour(emailCompany,nameCompany,name,gender, birthday ,address,emailCustomer,phone,startDate,numberOf,isHotel,requirement,tour_id,message)
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
