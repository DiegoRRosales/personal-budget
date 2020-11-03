const budgetdata = require('./budget-data.json');
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const budgetSchema = require('./models/pbSchema.js');
let url = 'mongodb://localhost:27017/personal_budget';
app.use(express.json());
app.use(cors());
app.use('/', express.static('public'));
//app.use(bodyParser.urlencoded({ extended: false });

/*
const budget = {
    myBudget: [
    {
        title: 'Eat out',
        budget: 25
    },
    {
        title: 'Rent',
        budget: 375
    },
    {
        title: 'Grocery',
        budget: 110
    },
  ]
};*/

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    res.json(budgetdata);
});

app.get('/budgetMongoose', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log("connected to the database")
            budgetSchema.find({})
                        .then((data)=>{
                            console.log(data)
                            mongoose.connection.close()
                        })
                        .catch((connectionError) =>{
                            console.log(connectionError)
                        })
        })
        .catch((connectionError) =>{
            console.log(connectionError)
        })
})


app.post('/addBudget', (req, res) => {
    console.log(req.body);
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        var newItem = new budgetSchema({
            title: req.body.title,
            budget: req.body.budget,
            background: req.body.background
        });
        budgetSchema.insertMany(newItem)
            .then((data)=> {
                res.json(data);
                mongoose.connection.close();
            })
            .catch((connectionError)=> {
                console.log(connectionError)
            });
        })
        .catch((connectionError)=>{
            console.log(connectionError)
        });
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});