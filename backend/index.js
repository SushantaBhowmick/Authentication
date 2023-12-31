const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const  authRoute  = require('./Routes/AuthRoute');
const  productRoute  = require('./Routes/ProductRoute');

const PORT = process.env.PORT || 5000;


// db connect
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("DataBase is Connected Successfully!"))
.catch((err)=>console.log(err))


//middlewares
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser())


//Route
app.use('/api/v1',authRoute)
app.use('/api/v1',productRoute)



app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})