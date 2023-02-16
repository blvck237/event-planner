require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const moment = require('moment');
const mongoose = require('mongoose');

const guestController = require('./controllers/guestController');
const authController = require('./controllers/authController');
const eventController = require('./controllers/eventController');

const Guests = mongoose.model('Guests');
const app = express();

// Set public folder
app.use(express.static('public'));
// Setting up our middlewares
app.use(cookieParser());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(expressSession({ secret: 'keyboard cat', key: 'userId', resave: false, saveUninitialized: false, cookie: { secure: false } }));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
// Setting up our view engine
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    helpers: {
      formatDate: require('./helpers/date').formatDate,
      areEqual: function (arg1, arg2) {
        return arg1 === arg2;
      },
      updateRSVP: function (rsvp, guestId, event) {
        console.log('rsvp', rsvp);
        Guests.findOneAndUpdate({ _id: guestId, event }, { rsvp }, { new: true });
      },
      stringify: function (obj) {
        return JSON.stringify(obj);
      },
    },
  })
);
app.set('view engine', 'hbs');

// Settign up our routes
app.use('/', authController);
app.use('/events', eventController);
app.use('/guests', guestController);

// Start server
app.listen(8000, () => {
  console.log('Express server started at port : 8000');
});
