const httperror = require('http-errors');
const { File } = require('../models/file');

class FileRepository{
    async addFile(file){
        try{
            let result = await File.create(file);
            return result;
        }catch(error) {
            throw error;
        }
    }
}
exports.FileRepository = FileRepository;


