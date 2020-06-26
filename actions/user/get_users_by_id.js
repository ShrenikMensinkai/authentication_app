const { UserRepository } = require('../../repository/user');
class GetUser{
    constructor(user_id){
        this.user_id = user_id;
    }
    async execute(){
        try{
            let userRepository = new UserRepository();  
            let user = await userRepository.getUser(this.user_id);
            return user;
        } catch (error) {
            throw error;
        }
    }
}
exports.GetUser =GetUser;