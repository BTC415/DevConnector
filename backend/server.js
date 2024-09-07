const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profiles = require("./routes/api/profiles");

const app = express();

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to Mongodb
mongoose.connect(db)
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err))

//Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Use routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profiles', profiles);

//passport middleware
app.use(passport.initialize())

//passport config
require("./config/passport")(passport);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on ${port}`))

