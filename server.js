const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const organisation = require('./routes/api/organisation');
const posts = require('./routes/api/posts');

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
app.use('/api/organisation', organisation);
app.use('/api/posts', posts);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));