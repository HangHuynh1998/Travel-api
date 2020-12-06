const { tourService } = require("../../services");

const getAllTour = (req, res) => {
    tourService.getAllTours(req.query)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
};
const getAllTourPlace = (req, res) => {
    tourService.getAllTours(req.query)
    .then(data => {
        console.log("da",req.body);
        var datasale =[]
        for(var i in data){
            if(data[i].place.toLowerCase().indexOf(req.body.searchPlace.toLowerCase()) !== -1){
                datasale.push(data[i])
            }
        }
        res.sendData(datasale);
    })
    .catch(err => {
        res.sendError(err.message);
    })
};
const getAllTourName = (req, res) => {
    tourService.getAllTours(req.query)
    .then(data => {
        console.log("da",req.body);
        var dataname =[]
        for(var i in data){
            if(data[i].name.toLowerCase().indexOf(req.body.searchName.toLowerCase()) !== -1){
                dataname.push(data[i])
            }
        }
        res.sendData(dataname);
    })
    .catch(err => {
        res.sendError(err.message);
    })
};
const getAllTourCompany = (req, res) => {
    tourService.getAllTours(req.query)
    .then(data => {
        console.log("da",req.body);
        var dataname =[]
        for(var i in data){
            if(data[i].company_id.user_id.name.toLowerCase().indexOf(req.body.searchCompany.toLowerCase()) !== -1){
                dataname.push(data[i])
            }
        }
        res.sendData(dataname);
    })
    .catch(err => {
        res.sendError(err.message);
    })
};
const getAllTourPrice = (req, res) => {
    tourService.getAllTours(req.query)
    .then(data => {
        console.log("da",req.body);
        var dataname =[]
        for(var i in data){
            if(data[i].price <= req.body.searchPrice){
                dataname.push(data[i])
            }
        }
        res.sendData(dataname);
    })
    .catch(err => {
        res.sendError(err.message);
    })
};
const getTourSale= (req, res) => {
    tourService.getAllTours(req.query)
        .then(data => {
            var datasale =[]
            for(var i in data){
                if(data[i].sale > 0){
                    datasale.push(data[i])
                }
            }
            res.sendData(datasale);
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
    getAllTourPlace,
    getAllTourName,
    getAllTourCompany,
    getAllTourPrice,
    getTourSale,
    getCategoryTours,
    getTourDetails,
    editTour,
    deleteTour
};  
