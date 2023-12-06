const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

const loginUserWithEmailAndPassword = async (email, password) => {
  // const user = await userService.getUserByEmail(email);
  // if(!user || !(await bcrypt.compare(password, user.password))){
  //     throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password")
  //   }
  // return user;

  const user = await userService.getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password")
  }
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};