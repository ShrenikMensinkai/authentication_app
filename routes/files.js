let express = require('express');
let router = express.Router();
let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });
const isAuthorized = require('../util/authorization');
const { FileUpload } = require("../actions/files/uploadfile");
const { ActionManager } = require('../actions/action_manager');

router.post("/", isAuthorized, upload.single('file'), function(req,res,next) {
    let file_obj = {
        "original_file_name" : req.file.originalname,
        "file_size" : req.file.size,
        "file_type" : req.file.mimetype,
        "file_name" : req.file.filename,
        "file_path" : req.file.path,
    }
 
    let action = new FileUpload(file_obj);
    ActionManager.execute(action)
    .then(result => {
        res.send(result)
    }).catch((err)=>{
        res.status(err.status || 400).send(err.message);
    })
 });

module.exports = router;
