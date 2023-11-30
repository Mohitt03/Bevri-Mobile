const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var Reservation = new Schema({
    text : {
        type:String
    }
})

Reservation.plugin(passportLocalMongoose);

module.exports = mongoose.model('Reservation', Reservation)