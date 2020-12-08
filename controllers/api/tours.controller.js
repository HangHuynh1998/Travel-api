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
        var datasale =[]
        for(var i in data){
            if(data[i].place.toLowerCase().indexOf(req.query.place.toLowerCase()) !== -1){
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
        var dataname =[]
        for(var i in data){
            if(data[i].name.toLowerCase().indexOf(req.query.name.toLowerCase()) !== -1){
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
        var dataname =[]
        for(var i in data){
            if(data[i].company_id.user_id.name.toLowerCase().indexOf(req.query.company.toLowerCase()) !== -1){
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
        var dataname =[]
        for(var i in data){
            if(data[i].price <= req.query.price){
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
    let query = {}
    tourService.getAllTours(query)
        .then(data => {
            var datasale =[]
            for(var i in data){
                if(data[i].sale > 0){
                    datasale.push(data[i])
                }
            }
            var datasalestatus = []
            if(req.query.status){
                for(var i in datasale){
                    if(datasale[i].status === "open" ){
                        datasalestatus.push(datasale[i])
                    }
                }  
            }
            if(req.query.limit){
                datasalestatus.splice(req.query.limit)
            }
           
            res.sendData(datasalestatus);
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
