require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: '15561561135',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 gün
      httpOnly: false,
      secure: false 
    }
  }));

const authRouter = require('./routes/authRouter.js');
const transportRouter = require('./routes/transportRouter.js');
const paymentRouter = require('./routes/paymentRouter.js');

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });

app.use('/api/auth', authRouter);
app.use('/api', transportRouter);
app.use('/api/payment', paymentRouter);
app.get('/', (req, res) => {
    res.render('home',{results:null});
});
app.get('/home', (req, res) => {
    res.redirect('/');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register',(req,res)=>{
    res.render('register');
})
app.get('/logout',(req,res)=>{
    res.render('logout');
})
app.get('/payment',(req,res)=>{
    res.render('payment');
})
app.get('/payment-success',(req,res)=>{
    res.render('payment-success');
})
app.get("/:id" ,async (req, res) => {
    const { id } = req.params;
    res.render("payment-success", { id });
}
);

module.exports = app;