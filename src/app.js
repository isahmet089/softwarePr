require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const transportRouter = require('./routes/transportRouter.js');

app.use('/api', transportRouter);

app.get('/', (req, res) => {
    res.render('home',{results:null});
});

module.exports = app;