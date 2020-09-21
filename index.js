const express = require('express');
const i18n = require("i18n");
const cookieParser = require('cookie-parser');

const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

// Config Internationalization
i18n.configure({
    locales: ['cn', 'en', 'vi'],
    directory: __dirname + '/locales',
    cookie: 'lang',
    updateFiles: false
});
app.use(i18n.init);

app.use('/change-lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000 });
    res.redirect('back');
});

app.get('/', function (req, res) {
    if (!req.cookies.lang) {
        res.cookie('lang', 'en');
    }
    res.render('./index', { title: 'Home', currentPage: 1, lang: req.cookies.lang || 'en' });
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

app.get('/partner-program', function (req, res) {
    res.render('./partner', { title: 'PARTNER PROGRAM', currentPage: 6, lang: req.cookies.lang || 'en' });
});

app.get('/privacy', function (req, res) {
    res.render('./privacy', { title: 'PRIVACY', lang: req.cookies.lang || 'en' });
});

app.get('/terms', function (req, res) {
    res.render('./terms', { title: 'TERMS', lang: req.cookies.lang || 'en' });
});

// Config Server Port
app.listen(process.env.PORT || 3000, function () {
    console.log('Server started!!!');
});