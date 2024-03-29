const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors')

const userRoute = require('./API/UserAPI');
const eventRoute = require('./API/EventAPI');
// const path = require('path');

const org ={
    origin:'http://localhost:3000'
}

app.use(cors(org));

mongoose.connect('mongodb://0.0.0.0:27017/EventManagement', function(error){
    if(error){
        console.log(error);
    }
    else{
        console.log('Connected to Database');
    }
})
// app.use(express.static(path='/EventFiles'));

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/staff/',userRoute);
app.use('/event/',eventRoute);

app.listen(2500,()=>{
    console.log('Server running on 2500 port');
})

// fs.mkdirSync(__dirname+"/EventFiles/"+'DummyEvent');