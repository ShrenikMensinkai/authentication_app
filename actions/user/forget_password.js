const bcrypt = require('bcryptjs');
const httperror = require('http-errors');
const randomString = require("randomstring");
const { UserRepository } = require('../../repository/user');
const {Email}   = require('../../util/config_email');
class ForgetPassword{
    constructor(email){
        this.email = email;
    }
    async execute(){
        try{
            let userRepository = new UserRepository();  
            let emailObj = new Email();
            let user = await userRepository.getUserForLogin(this.email);
            if(user){
                let randomPass = randomString.generate({
                    length: 10,
                    charset: 'alphanumeric'
                });
                
                let hashedPassword = bcrypt.hashSync(randomPass, 8);
                let result = await userRepository.resetPassword(this.email, hashedPassword);
                await emailObj.sendPasswordMail(this.email,randomPass);
                return ({"message" : "Password sent to user email"});
            }else{
                throw new httperror(400, `Invalid email`);
            }
        } catch (error) {
            throw error;
        }
    }
}
exports.ForgetPassword =ForgetPassword;