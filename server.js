const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const projectOwner = require('./routes/api/projectOwner');
const projects = require('./routes/api/projects');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to mongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log.apply(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/projectOwner', projectOwner);
app.use('/api/projects', projects);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));