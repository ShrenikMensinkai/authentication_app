const httperror = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randomString = require("randomstring");

const { User } = require('../models/user');
// const {Email}   = require('../email/config_mail');

class UserRepository{
    async getUserForLogin(email){
        try{
            let result = await User.findOne({"email" : email}).lean();
            if(!result){
                throw new httperror(400, `Invalid email`);
            }
            return result;
        }catch(error) {
            throw error;
        }
    }

    async resetPassword(email, password){
        try{
            let result = await User.updateOne({"email":email},{"password":password});
            return true;
        }catch(error){
            throw error;
        }
    }

    async forgotPassword(data){
        try{
            let email = data.body.email;

            let agency_result = await Agency.findOne({'agencyName':req.headers['host_origin']});
            let Agency_id = agency_result.agencyId;

            let userEmail = await User.findOne({"email" : email,"agencyId":Agency_id});
            if(userEmail == 'undefined' || userEmail == null ){
                return ({"message" : "User Email Not found"});
            }else{
                let randomPass = randomString.generate({
                    length: 10,
                    charset: 'alphanumeric'
                });
                let emailObj = new Email();
                let hashedPassword = bcrypt.hashSync(randomPass, 8);
                let result = await User.update({"email":userEmail.email},{"password":hashedPassword});
                emailObj.resetpasswordMail(userEmail.email,randomPass);
                return ({"message" : "Password sent to user mail"});
            }
        }catch(error) {
            throw error;
        }
    }

   

    async sendPassword(email){
        try{
            let userEmail = await User.findOne({"email" : email});
            if(userEmail == 'undefined' || userEmail == null ){
                return ({"message" : "User Email Not found"});
            }else{
                if(userEmail.password==null){
                    let randomPass = randomString.generate({
                        length: 10,
                        charset: 'alphanumeric'
                    });
                    let emailObj = new Email();
                    let hashedPassword = bcrypt.hashSync(randomPass, 8);
                    let result = await User.update({"email":userEmail.email},{"password":hashedPassword});
                    emailObj.resetpasswordMail(userEmail.email,randomPass);
                    return ({"message" : "Password sent to user mail"});
                }
                else{
                    return ({"message" : "User Email already Registered"});
                }
            }
        }catch(error) {
            throw error;
        }
    }
    
}


exports.UserRepository = UserRepository;


