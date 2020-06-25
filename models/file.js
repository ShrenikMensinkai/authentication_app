const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const database = require('../database').Database;

const fileSchema = new Schema({
    original_file_name   : {type : String , required : true},
    file_size   : {type : String , required : true},
    file_type   : {type : String , required : true},
    file_name   : {type : String , required : true},
    file_path   : {type : String , required : true},
});
  
exports.File = mongoose.model('File', fileSchema,'File')
