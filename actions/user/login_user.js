const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const httperror = require('http-errors');
const config = require('../../util/secret');

const { UserRepository } = require('../../repository/user');


class LoginUser{
    constructor(email, password){
        this.email = email;
        this.password = password;
    }

    async execute(){
        try{
            let userRepository = new UserRepository();  
            let user = await userRepository.getUserForLogin(this.email);
            let isPasswordValid = bcrypt.compareSync(this.password, user.password);
            delete user.password;
            if (!isPasswordValid){
                throw new httperror(400, `Invalid email or password`);
            }else{
                let token = jwt.sign({ 
                    id: user._id,
                    name : user.name,
                    email : user.email,
                }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
                });
                return ({ 
                    token,
                    user_id : user._id,
                    name : user.name,
                    email : user.email,
                });
            }       
        } catch (error) {
            throw error;
        }
    }
}
exports.LoginUser =LoginUser;