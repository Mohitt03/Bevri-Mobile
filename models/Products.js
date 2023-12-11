const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var Products = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brief: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

Products.plugin(passportLocalMongoose); 

module.exports = mongoose.model('Products', Products)