const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var Parking = new Schema({
    parking_number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    main_area_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total_spot: {
        type: Number,
        required: true
    },
    available: {
        type: Number,
        required: true
    },

    occupied: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    iframe_link: {
        type: String,
        required: true
    },
    img1: {
        type: String
    },
    img2: {
        type: String
    },

},
    {
        timestamps: true
    }
)

Parking.plugin(passportLocalMongoose);

module.exports = mongoose.model('Parking', Parking)
