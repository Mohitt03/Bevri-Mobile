const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var Reservation = new Schema({
    username: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    restaurant: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    people: {
        type: String,
        required: true
    },
    seat: {
        type: String,
        required: true
    },
    ocassion: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

Reservation.plugin(passportLocalMongoose);

module.exports = mongoose.model('Reservation', Reservation)