require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_STRING);

const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/User");

jwtOptions = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new jwtStrategy(jwtOptions, (payload, done)=>{
    User.findOne({_id: payload.id}, (err, user)=>{
        if(err) return done(err, false, {message: "Error authenticating user."});
        if (!user) return done(null, false, {message: "User not found."});
        return done(null, user, {message: "Login successful!"});
    });
}));


const stripe = require("stripe")(process.env.STRIPE_API_KEY);

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./routes');
app.use("/api", routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>console.log(`API is listening on port ${PORT}`));