

const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");

const getUserByEmail = async(email) => {
    // const userObj = await User.findOne({
    //     where: {
    //         email: email
    //     }
    // });
    // return userObj

    const userObj = await User.findOne({email});
    return userObj
}


const createUser = async (user) => {
    if(await User.isEmailTaken(user.email)){
        throw new ApiError(httpStatus.CONFLICT, 'Email already taken');
    }
    if(!user.email){
        throw new ApiError(httpStatus.BAD_REQUEST, "Email is not allowed to be empty");
    }
    if(!user.username){
        throw new ApiError(httpStatus.BAD_REQUEST, "Name field is required");
    }
    if(!user.password){
        throw new ApiError(httpStatus.BAD_REQUEST, "Password field is required");
    }
    // if(!await User.areSubjectsAllowed(user.role, user.subjectsAllowed)){
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Students are not allowed to add Subjects');
    // }

    console.log(user)
    const hashedPassword = await bcrypt.hash(user.password, 10)

    const newUser = await User.create({...user, password: hashedPassword});

    console.log('new user created', newUser)
    return newUser;
}

module.exports = {
    createUser,
    getUserByEmail
};
