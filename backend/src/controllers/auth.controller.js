const { tokenService, userService, authService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const register = catchAsync(async (req, res) => {  
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({user, tokens});
});

const login = catchAsync(async (req, res) => {
    const {email, password} = req.body;

    console.log(email, password, 'password')
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.OK).send({user, tokens})
});


module.exports = {
    register,
    login
};