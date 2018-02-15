const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: {type: mongoose.SchemaTypes.ObjectId},
    sku: {type: String, default: mongoose.Types.ObjectId()},
    name: {type: String, required: true},
    attribues: [
        {attributeName: {type: String}, attributeValue: {type: String}}
    ],
    dimensions: {
        length: {type: Number},
        width: {type: Number}, 
        height: {type: Number}
    },
    weight: {type: Number},
    imagePath: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
}, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema);