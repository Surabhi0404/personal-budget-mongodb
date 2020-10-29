const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const budgetModel = require("./models/budget_schema")
const bodyParser = require("body-parser");

let url = 'mongodb://localhost:27017/personal_budget_db';

app.use(cors());
app.use(bodyParser.json());



app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        budgetModel.find({})
        .then((data)=>{
            mongoose.connection.close();
            res.status(200).json(data);            
        })
        .catch((connectionError)=>{
            console.log(connectionError);
            res.status("400").json(connectionError)
        })
    })
    .catch((connectionError)=>{
        console.log(connectionError);
        res.status("400").json(connectionError)
    })
});

app.post('/budget/add', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        let postData = {$set:{
                title: req.body.title,
                value: req.body.value,
                color: req.body.color
            }
        }
        budgetModel.update({title: req.body.title}, postData, {upsert: true})
            .then((data)=>{
                mongoose.connection.close();
                res.status(200).json(data);
            })
            .catch((connectionError)=>{
                console.log(connectionError);
                res.status("400").json(connectionError)
            })
    })
    .catch((connectionError)=>{
        console.log(connectionError);
        res.status("400").json(connectionError)
    })
    
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});