const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String } // URL de la imagen del producto
});

module.exports = mongoose.model("Product", ProductSchema);
