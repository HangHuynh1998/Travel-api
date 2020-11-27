const userCtrl = require('./users.controller')
const authCtrl = require('./auth.controller')
const bookTourCtrl = require('./bookTours.controller')
const categotyCtrl = require ('./categories.controller')
const contactCtrl = require('./contact.controller')
const tourCtrl = require('./tours.controller')
const commentCtrl = require('./comment.controller')
const companyCtrl = require('./company.controller')
const customerCtrl = require('./customer.controller')


module.exports = {
    userCtrl,
    authCtrl,
    bookTourCtrl,
    categotyCtrl,
    contactCtrl,
    tourCtrl,
    commentCtrl,
    companyCtrl,
    customerCtrl
}