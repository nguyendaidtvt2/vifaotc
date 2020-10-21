require('dotenv').config();

const express = require('express');
const i18n = require("i18n");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const app = express();

const questionController = require('./controllers/question.controller');

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

// Config Internationalization
i18n.configure({
    locales: ['cn', 'en', 'vi'],
    directory: __dirname + '/locales',
    cookie: 'lang',
    defaultLanguage: 'en',
    updateFiles: true
});
app.use(i18n.init);

// MongoDB
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
        if (err) {
            console.log("connect fail : " + err);
        } else {
            console.log("DB connected!!!");
        }
    });

const Question_type = require('./models/question_type');

app.use('/change-lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000 });
    res.redirect('back');
});

app.get('/', function (req, res) {
    if (!req.cookies.lang) {
        res.cookie('lang', 'en');
    }
    res.render('./index', { title: 'Home', currentPage: 1, lang: req.cookies.lang });
});

app.get('/dealer', function (req, res) {
    res.render('./dealer', { title: 'Be a Trader', currentPage: 2, lang: req.cookies.lang || 'en' });
});

app.get('/cooperation', function (req, res) {
    res.render('./cooperation', { title: 'Corporate Collaboration', currentPage: 3, lang: req.cookies.lang || 'en' });
});

app.get('/about', function (req, res) {
    res.render('./about', { title: 'About us', currentPage: 4, lang: req.cookies.lang || 'en' });
});

app.get('/help', questionController.help);

app.get('/partner-program', function (req, res) {
    res.render('./partner', { title: 'PARTNER PROGRAM', currentPage: 6, lang: req.cookies.lang || 'en' });
});

app.get('/privacy', function (req, res) {
    res.render('./privacy', { title: 'PRIVACY', currentPage: 0, lang: req.cookies.lang || 'en' });
});

app.get('/terms', function (req, res) {
    res.render('./terms', { title: 'TERMS', currentPage: 0, lang: req.cookies.lang || 'en' });
});

app.get('/question', function (req, res) {
    Question_type.find({}, function (err, data) {
        if (err) {
            return res.send(err);
        } else {
            res.render('./question', { q_category: data });
        }
    });
});

app.post('/question', questionController.add_question);

app.post('/add_question_type', questionController.add_question_type);

app.get('/help/:id', questionController.question_detail);

// app.get('/question/category/:id', questionController.question_category);

// Config Server Port
app.listen(process.env.PORT || 3000, function () {
    console.log('Server started!!!');
});