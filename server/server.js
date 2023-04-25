require("dotenv").config();
const express = require('express');
const app = express();
const port = 8000
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use(cookieParser()) 

require('./config/mongoose.config')
require('./routes/user.route')(app)
require('./routes/admin.route')(app)
 



app.listen(port,()=>console.log(`Locked and Loaded on Port ${port}`))