const bcrypt = require('bcryptjs');
const { UserRepository } = require('../../repository/user');
class AddUser{
    constructor(user){
        this.user = user;
    }
    async execute(){
        try{
            let userRepository = new UserRepository();  
            this.user.password = bcrypt.hashSync(this.user.password, 8);
            let user = await userRepository.addUser(this.user);
            delete user.password;
            delete user.__v;
            return user;
        } catch (error) {
            throw error;
        }
    }
}
exports.AddUser =AddUser;