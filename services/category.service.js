const Categorie = require("../models/categories")

const getAllCategories = () => {
    return new Promise((resolve, reject) => {
        Categorie.find()
        .sort({createdAt: -1})
        .then(doc => {
            if(doc == null) throw new Error("Categories not found !");
            resolve(doc);
        })
        .catch(err => {
            reject(err);
        })
    })
}

const getCategoryDetail = (id) => {
    return new Promise((resolve, reject) => {
        Categorie.findById(id)
        .then(doc => {
            if(doc == null) throw new Error("Categorie not found !");
            resolve(doc);
        })
        .catch(err => {
            reject(err);
        })
    })
}

module.exports = {
    getAllCategories,
    getCategoryDetail,
}