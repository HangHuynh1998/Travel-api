const Company = require("../models/company");
const Tour = require("../models/tour");
const Booktour = require("../models/booktour");
const Customer=require ("../models/customer")

const getCompany = (key, value) => {
    let query = {};
    if (key == "user_id") {
        query = { user_id: value }
    } else {
        query = { _id: value }
    }
    return new Promise((resolve, reject) => {
        Company.findOne(query)
            .populate("user_id", "-password")
            //.populate("category_id")
            .then(doc => {
                if (doc == null) throw new Error("Company not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const getCompanyDetails = (id) => {
    return new Promise((resolve, reject) => {
        Company.findById(id)
            .populate("user_id", "-password")
            //.populate("category_id")
            .then(doc => {
                if (doc == null) throw new Error("Company not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const getAllCompany = (filter) => {
    let query = {};
    if (filter.searchName) {
        query["name"] = { '$regex' : filter.searchName, '$options' : 'i' };
    }
    // if (filter.searchCategory) {
    //     query["category_id"] = filter.searchCategory;
    // }
    if (filter.searchPosition) {
        query["position"] = filter.searchPosition;
    }
    let pageIndex = filter.page ? Number(filter.page) - 1 : 0;
    let perPage = filter.limit ? Number(filter.limit) : 1000;
    let sortBy = filter.sort ? filter.sort : "name";
    let sortType = filter.typeOfSort ? (filter.typeOfSort == "inc" ? 1 : -1) : 1;
    console.log(query);
    return new Promise((resolve, reject) => {
        Company.find(query)
            .sort([[sortBy, sortType]])
            .skip(pageIndex * perPage)
            .limit(perPage)
            .populate("user_id", "-password")
            //.populate("category_id")
            .then(doc => {
                if (doc == null) throw new Error("Companies not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const getCompanyTours = (id, filter) => {
    let query = { company_id: id };
    if (filter.tourstatus) {
        query["status"] = filter.toursStatus
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
            .populate({
                path: "isApplied",
                model: "Customer",
                populate: {
                    path: "user_id",
                    model: "User",
                }
            
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

const getTourApplications = (company_id, tour_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tour = await Tour.findById(tour_id);
            if (!tour) throw new Error("Tour not found");
            if (tour.company_id.toString() !== company_id.toString()) {
                return reject({ message: "Permission denied !" })
            } else {
                let applications = Booktour.find({
                    tour_id: tour_id
                });
                if (!applications) throw new Error("Applications not found");
                return resolve(applications);
            }
        } catch (err) {
            return reject(err);
        }
    })
}

module.exports = {
    getCompany,
    getAllCompany,
    getCompanyDetails,
    getCompanyTours,
    getTourApplications
}