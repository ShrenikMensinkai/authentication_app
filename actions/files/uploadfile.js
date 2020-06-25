const { FileRepository } = require('../../repository/file');

class FileUpload{
    constructor(file){
        this.file = file;
    }
    async execute(){
        try{
            let fileRepository = new FileRepository();  
            let file = await fileRepository.addFile(this.file);
            return file;
        } catch (error) {
            throw error;
        }
    }
}
exports.FileUpload =FileUpload;