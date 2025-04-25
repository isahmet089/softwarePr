require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const voyageRouter = require('./routes/voyageRouter');


app.use('/api/voyage', voyageRouter);

//home page route   
app.get('/', (req, res) => {
    res.render('home');
  });

module.exports = app;