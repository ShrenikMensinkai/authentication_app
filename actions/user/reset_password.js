const bcrypt = require('bcryptjs');
const httperror = require('http-errors');
const { UserRepository } = require('../../repository/user');

class ResetPassword{
    constructor(old_password, new_password, email){
        this.old_password = old_password;
        this.new_password = new_password;
        this.email = email;
    }
    async execute(){
        try{
            let userRepository = new UserRepository();  
            let user = await userRepository.getUserForLogin(this.email);
            let isValid = bcrypt.compareSync(this.old_password, user.password);
            if (!isValid){
                throw new httperror(400, `Invalid password`);
            }else{
                let hashedPassword = bcrypt.hashSync(this.new_password, 8);
                let result = await userRepository.resetPassword(this.email, hashedPassword);
                return ({"message":"Password Reset Success"});
            }
        } catch (error) {
            throw error;
        }
    }
}
exports.ResetPassword =ResetPassword;