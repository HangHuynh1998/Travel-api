let express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
require("dotenv/config")
let app = express();
let port = process.env.PORT || 3001;
 //middlewares
 app.use(cors())
app.use(bodyParser.json())
//
// app.use("/posts",()=>{
//     console.log("This is middlewares running...");
// })

// import routes
// Boostrap routes
require("./config/express")(app);

//connect to DB
mongoose.connect(process.env.MONGOOSE_DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true },()=>{
    console.log("connect to DB")
    
})

//router
app.get("/",(req,res) => {
    res.send('We are on home')
})

app.listen(port);

console.log('RESTful API server started on: ' + port);