const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const app = express();

//LOAD ROUTES
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//PASSPORT CONFIG
require('./config/passport')(passport);

//DB CONFIG
const db = require('./config/database');

//CONNECT TO MONGOOSE
mongoose.connect(db.mongoURI, {
  useNewUrlParser: true
})
.then(() => console.log('mongodb connected...'))
.catch(err => console.log(err));

//HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//STATIC FOLDER (THIS IS HOW WE SET THE PUBLIC FOLDER TO EXPRESS STATIC FOLDER)
app.use(express.static(path.join(__dirname, 'public')));

//METHOD OVERRIDE MIDDLEWARE
app.use(methodOverride('_method'));

//EXPRESS SESSION MIDDLEWARE
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//GLOBAL VARIABLES
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//INDEX ROUTE
app.get('/', (req, res) =>{
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

//ABOUT ROUTE
app.get('/about', (req, res) =>{
  res.render('about');
});

//USE ROUTES
app.use('/ideas', ideas);
app.use('/users', users);

//LISTEN TO THE APP ON PORT 5000
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});