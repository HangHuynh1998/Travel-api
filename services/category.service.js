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
const addCategories = (body) =>{
        return new Promise(async (resolve, reject) => {
            try {
                    let data = {
                        name: body.name,
                        description: body.description,
                    }
                    let categories = new Categorie(data);
                    await categories.save();
                    return resolve("Successful")
                
            } catch (error) {
                return reject(error)
            }
        })
}

module.exports = {
    getAllCategories,
    getCategoryDetail,
    addCategories
}