const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var Reservation = new Schema({
    username: {
        type: String
    },
    number: {
        type: Number
    },
    restaurant: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    people: {
        type: String
    },
    seat: {
        type: String
    },
    ocassion: {
        type: String
    }
},
    {
        timestamps: true
    }
)

Reservation.plugin(passportLocalMongoose);

module.exports = mongoose.model('Reservation', Reservation)