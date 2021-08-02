const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cors = require("cors");

const port = 3000;

mongoose.connect("mongodb://localhost:27017/TokenValidation", 
    { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log("Successfully connected to DATABASE");
});
const app = express();

app.use(cors("http://localhost:4200"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/users', usersRouter);



app.listen(port, ()=>{
    console.log(`Server is running at PORT : ${port}`);
})