const router = require ('express').Router()

//call 
const authRoute = require ('./auth')
const userRoute = require('./users')
const tourRoute = require('./tour')
const bookTourRoute = require("./bookTour")
const categoryRoute = require("./category")
// const commentRoute = require("./comment")
const companyRoute = require("./company")
const contactRoute = require("./contact")
const customerRoute = require("./customer")

//router
router.use('/auth',authRoute)
router.use('/users',userRoute)
router.use('/tour',tourRoute)
router.use('/bookTour',bookTourRoute)
router.use('/category',categoryRoute)
// router.use('./comment',commentRoute)
router.use('/company',companyRoute)
router.use('/contact',contactRoute)
router.use('/customer',customerRoute)

module.exports = router