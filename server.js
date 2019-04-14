const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Route handlers
const users = require('./routes/api/users');
const projects = require('./routes/api/projects');
const reports = require('./routes/api/reports');



const app = express();





// Body parser moddleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;


// Connect to MongoDb
mongoose.connect(db, {useNewUrlParser: true})
    .then(()=> console.log('MongoDb connected'))
    .catch(error=>console.log(error));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);


// Use routes
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/reports', reports);





const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server started on port ${port}`));