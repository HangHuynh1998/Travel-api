const Customer = require("../models/customer");
const Booktour = require("../models/booktour");
const Company = require("../models/company");
const User = require("../models/users");
const customer = require("../models/customer");

const getCustomer = (key, value) => {
    let query = {};
    if (key == "user_id") {
        query = { user_id: value }
    } else {
        query = { _id: value }
    }
    return new Promise((resolve, reject) => {
        customer.findOne(query)
            .populate("user_id", "-password")
            .then(doc => {
                if (doc == null) throw new Error("Customer not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const getAllCustomer = ()=>{
    return new Promise((resolve, reject) => {
        Customer.find()
            .populate({
                path: "user_id",
                model: "User",
            })
            .then(doc => {
                if (doc == null) throw new Error("Customer not found !");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}


const getAppliedTour = (id) => {
    return new Promise((resolve, reject) => {
        Customer.findById(id, "applied_tours -_id")
            .populate({
                path: "applied_tours",
                model: "Tour",
                populate: [
                    {
                        path: "company_id",
                        model: "Companies",
                        populate: {
                            path: "user_id",
                            model: "User",
                            select: "-password"
                        }
                    }
                ],
            })
            .then(doc => {
                if (doc == null) throw new Error("Customer not found !");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

// SAVED TOURS

const getAllSavedTours = (id) => {
    return new Promise((resolve, reject) => {
        Customer.findById(id, "saved_tours -_id")

            .populate({
                path: "saved_tours",
                model: "Tour",
                populate: [
                    {
                        path: "company_id",
                        model: "Companies",
                        populate: {
                            path: "user_id",
                            model: "User",
                            select: "-password"
                        }
                    }
                ],
            })
            .then(doc => {
                if (doc == null) throw new Error("Customer not found !");
                resolve(doc.saved_jobs);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const toggleSavedTour = (id, job_id) => {
    return new Promise((resolve, reject) => {
        Customer.findById(id)
            .then(doc => {
                if (doc == null) throw new Error("Customer not found !");
                let i = doc.saved_tours.indexOf(job_id);
                if (i != -1) {
                    doc.saved_tours.splice(i, 1);
                } else {
                    doc.saved_tours.push(job_id)
                }
                doc.save(err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc.saved_tours);
                    }
                });
            })
            .catch(err => {
                reject(err);
            })
    })
}

const getCustomerApplications = (id) => {
    return new Promise((resolve, reject) => {
        Booktour.find({ customer_id: id })
            .populate({
                path: "tour_id",
                model: "Tour",
                populate: [
                    {
                        path: "company_id",
                        model: "Companies",
                        populate: {
                            path: "user_id",
                            model: "User",
                            select: "-password"
                        }
                    }
                ],
            })
            .then(doc => {
                if (doc == null) throw new Error("Customer not found !");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Follow company
const getFollowedCompany = (id) => {
    return new Promise((resolve, reject) => {
        Customer.findById(id, "followed_companies -_id")
            .populate({
                path: "followed_companies",
                model: "Companie",
                populate: [
                    {
                        path: "user_id",
                        model: "User",
                        select: "-password"
                    }
                ],
            })
            .then(doc => {
                if (doc == null) throw new Error("Customer not found !");
                resolve(doc.followed_companies);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const toggleFollowCompany = (id, company_id) => {
    return new Promise((resolve, reject) => {
        Customer.findById(id)
            .then(async doc => {
                if (doc == null) throw new Error("Company not found !");
                let i = doc.followed_companies.indexOf(company_id);
                let company = await Company.findById(company_id);
                if (i != -1) {
                    doc.followed_companies.splice(i, 1);
                    
                    company.numberFollow--;
                    
                } else {
                    doc.followed_companies.push(company_id)
                    company.numberFollow++;
                }
                await company.save();
                doc.save(err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc.followed_companies);
                    }
                });
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = {
    getCustomer,
    getAllCustomer,
    getAppliedTour,
    getAllSavedTours,
    toggleSavedTour,
    // APPLICATIONS
    getCustomerApplications,
    getFollowedCompany,
    toggleFollowCompany
}