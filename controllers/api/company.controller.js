const { companyService } = require("../../services");

const getCompany = (req, res) => {
    let id = req.params.id;
    companyService.getCompany("user_id", id)
    .then(data => {
        res.sendData(data);
    })
    .catch(err => {
        res.sendData(err.message);
    })
}



const getCompanyTours = (req, res) => {
    companyService.getCompanyTours(req.params.id, req.query)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};

const getAllCompany = (req, res) => {
    companyService.getAllCompany(req.query)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};

const getCompanyDetails = (req, res) => {
    let id = req.params.id;
    companyService.getCompany("_id", id)
    .then(data => {
        res.sendData(data);
    })
    .catch(err => {
        res.sendError(err.message);
    })
};

const getTourApplications = (req, res) => {
    companyService.getTourApplications(req.user._id, req.params.job_id)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
}
const deleteCompany = (req, res) => {
    companyService.deleteCompany(req.params.id)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
}
module.exports = {
    getCompany,
    getCompanyTours,
    getAllCompany,
    getCompanyDetails,
    getTourApplications,
    deleteCompany
};
