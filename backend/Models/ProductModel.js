const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { 
        type: String 
    },
    price: { 
        type: Number 
    },
    category: { 
        type: String 
    },
    description: { 
        type: String
     },
})

module.exports = mongoose.model("Products", productSchema)