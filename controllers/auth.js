const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

exports.adminLogin = (req, res)=>{
    User.find({username: req.body.username}, (err, user)=>{
        user = user[0]

        if(err) return res.status(500).json({success: false, err, message: "Error connecting to database."});
        if(!user) return res.status(401).json({success: false, message: "Incorrect username or password."});
        if(bcrypt.compareSync(req.body.password, user.password) === false) return res.status(401).json({success: false, message: "Incorrect username or password"});
        if(user.isAdmin === false) return res.status(401).json({success: false, message: "Incorrect username or password."});

        var payload = {username: user.username, id: user._id, isAdmin: user.isAdmin};
        var token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({success: true, user: payload, token});
    });
}
