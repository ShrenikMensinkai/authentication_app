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

    async addUser(user){
        try{
            let result = await User.create(user);
            return result.toObject();
        }catch(error){
            throw error;
        }
    }
}


exports.UserRepository = UserRepository;


