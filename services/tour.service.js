const Tour = require("../models/tour");
const Company = require("../models/company");


// Utils
const { updateDocument } = require("../utils/updateDocument");

const getAllTours = (filter) => {
    let query = {};
    if (filter.searchName) {
        query["name"] = { '$regex' : filter.searchName, '$options' : 'i' };
    }
    if (filter.searchCategory) {
        query["category_id"] = filter.searchCategory;
    }
    if (filter.searchPlace) {
        query["place"] = filter.searchPlace;
    }
    if (filter.searchNumberPeople) {
        query["numberPeople"] = filter.searchNumberPeople;
    }
    if (filter.price) {
        query["price"] = filter.price;
    }

    console.log(query)
    let pageIndex = filter.page ? Number(filter.page) - 1 : 0;
    let perPage = filter.limit ? Number(filter.limit) : 1000;
    let sortBy = filter.sort ? filter.sort : "title";
    let sortType = filter.typeOfSort ? (filter.typeOfSort == "inc" ? 1 : -1) : 1;
    return new Promise((resolve, reject) => {
        Tour.find(query)
            .sort([[sortBy, sortType]])
            .skip(pageIndex * perPage)
            .limit(perPage)
            .populate({
                path: "company_id",
                populate: {
                    path: "user_id",
                    model: "User",
                    select: { 'password': 0 }
                }
            })
            .populate({
                path: "category_id",
                model: "Categories",
            })
            .then(doc => {
                if (doc == null) throw new Error("Tours not found !");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const getCategoryTours = (id, filter) => {
    let query = { category_id: id };
    if (filter.tourType) {
        query["tourType"] = filter.tourType;
    }
    if (filter.tourStatus) {
        query["status"] = filter.tourStatus
    }
    let pageIndex = filter.page ? Number(filter.page) - 1 : 0;
    let perPage = filter.limit ? Number(filter.limit) : 1000;
    let sortBy = filter.sort ? filter.sort : "createdAt";
    let sortType = filter.typeOfSort ? (filter.typeOfSort == "inc" ? 1 : -1) : -1;
    return new Promise((resolve, reject) => {
        Tour.find(query)
            .sort([[sortBy, sortType]])
            .skip(pageIndex * perPage)
            .limit(perPage)
            .populate({
                path: "company_id",
                populate: {
                    path: "user_id",
                    model: "User",
                    select: { 'password': 0 }
                }
            })
            .populate({
                path: "category_id",
                model: "Categories",
            })
            .then(doc => {
                if (doc == null) throw new Error("Tours not found !");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const addTour = (company_id, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let company = await Company.findById(company_id);
            if (!company) {
                return reject({ message: "Only companies can post a tour" });
            } else {
                let data = {
                    company_id: company_id,
                    name: body.name,
                    numberPeople:body.numberPeople,
                    price: body.price,
                    place: body.place,
                    description: body.description,
                    image: body.image,
                    startDate: body.startDate,
                    endDate: body.endDate,
                    contactInformation: body.contactInformation,
                    category_id: body.category_id,
                }
                let tour = new Tour(data);
                await tour.save();
                company.available_jobs++;
                await company.save();
                return resolve("Successful")
            }
        } catch (error) {
            return reject(error)
        }
    })
}

const getTourDetails = (id) => {
    return new Promise((resolve, reject) => {
        Tour.findById(id)
            .populate({
                path: "company_id",
                populate: {
                    path: "user_id",
                    model: "User",
                    select: { 'password': 0 },
                }
            })
            .populate({
                path: "company_id",
                populate: {
                    path: "category_id",
                    model: "Categories",
                    select: "name",
                }
            })
            .populate({
                path: "category_id",
                model: "Categories",
            })
            .then(doc => {
                if (doc == null) throw new Error("Tour not found !");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const editTour = (id, user, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tour = await Tour.findById(id);
            if (!tour) throw new Error("Tour not found !");
            if (user._id.toString() === tour.company_id.toString()) {
                await updateDocument(tour, Tour, body, ["company_id"]);
                await tour.save();
                return resolve(tour);
            } else {
                return reject({ message: "Permission denied !" });
            }
        } catch (err) {
            return reject(err);
        }
    })
}

const deleteTour = (id) => {
    return new Promise( async (resolve, reject) => {
        let tour = await Tour.findById(id);
        let company = await Company.findById(tour.company_id);
        Tour.findOneAndDelete({ _id: id }, async (err, doc) => {        
            if (doc == null) return reject({ message: "Tour not found !" });
            if (err) {
                reject(err);
            } else {
                // company.available_jobs--;
                await company.save();
                resolve("Delete tour successfully");
            };
        })
    })
}

module.exports = {
    addTour,
    getAllTours,
    getCategoryTours,
    getTourDetails,
    editTour,
    deleteTour
}