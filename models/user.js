const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const database = require('../database').Database;

const UserDataSchema = new Schema({
  name        : { type: String, trim:  true, require: true},
  phoneNo     : { type: String, trime: true},
  email       : { type: String, unique: true, require: true, index: true},
  password    : { type: String, trime: true, require: true},
});

exports.User = mongoose.model('User', UserDataSchema,'User')
