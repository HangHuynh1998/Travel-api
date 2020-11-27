const router = require ('express').Router()

//call 
const authRoute = require ('./auth')
const userRoute = require('./users')

//router
router.use('/auth',authRoute)
router.use('/users',userRoute)

module.exports = router