const { text } = require('body-parser');
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var Reservation = new Schema({
    // text : {
    //     type:String
    // },
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
        type: String
    },
    ocassion: {
        type: String
    },
    username: {
        type: String
    }
},
    {
        timestamps: true
    }
)

Reservation.plugin(passportLocalMongoose);

module.exports = mongoose.model('Reservation', Reservation)