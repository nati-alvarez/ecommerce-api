const Orders = require("../models/Order");

exports.getCatalogue = (req, res)=>{
    Orders.find({}, (error, orders)=>{
        if(error) return res.json({success: false, error: error});
        res.json({success: true, orders: orders});
    })
}
