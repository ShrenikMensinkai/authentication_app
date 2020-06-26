const httperror = require('http-errors');
const { User } = require('../models/user');

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

    async getUser(user_id){
        try{
            let condition = {'_id':user_id};
            let result = await User.findOne(condition,{'password':0,'__v':0}).lean();
            return result;
        }catch(error){
            throw error;
        }
    }
}


exports.UserRepository = UserRepository;


