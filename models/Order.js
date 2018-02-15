const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    id: {type: mongoose.SchemaTypes.ObjectId},
    chargeId: {type: String, required: true},
    customer: {
        name: {type: String, required: true},
        email: {type: String, required: true}
    },
    cart: {type: Object, required: true},
    shipping: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true, default: "USA"}
    }
}, {timestamps: true});

module.exports = mongoose.model("Order", OrderSchema);