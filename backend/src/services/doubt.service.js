const httpStatus = require("http-status");
const { Doubt } = require("../models/doubt.model");
const { User } = require("../models/user.model");
const { mongoose } = require("mongoose");
const ApiError = require("../utils/ApiError");

const createDoubt = async (doubt, userId) => {
    let existingStudent;
    const { doubtTitle, doubtContent, subject, isResolved, role, language } = doubt

    if (!userId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    existingStudent = await User.findById(userId);

    if (!existingStudent) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Student doesnt exists');
    }

    if (existingStudent.role !== 'student') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User should be student to post a doubt');
    }

    const newDoubt = new Doubt({
        doubtTitle,
        doubtContent,
        subject,
        isResolved,
        language,
        user: existingStudent
    })


    const session = await mongoose.startSession();
    session.startTransaction();
    await newDoubt.save({ session })
    existingStudent.doubts.push(newDoubt);
    await existingStudent.save({ session })
    await session.commitTransaction();

    return newDoubt

}


// const doubts = await Doubt.find({ subject: { $in: subjectsAllowed } });

const getAllMatchingDoubts = async (subjectsAllowed, language, userId) => {

    let user = await User.findById(userId);

    // console.log(user, 'isTeacher')

    if (user.role !== 'teacher') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Only teachers are allowed to resolved doubts');
    }

    const doubts = await Doubt.find({
        subject: { $in: subjectsAllowed },
        language: language,
        isResolved: false,
    });
    return doubts
}

const getAllPreviousDoubts = async (userId) => {
    let user = await User.findById(userId);
    if (user.role !== 'student') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Only students are allowed to get there logs history');
    }
    const doubtsHistory = await User.findById(userId).populate({ path: 'doubts', model: Doubt }).select('username email')
    return doubtsHistory
}

const updateDoubt = async (data, id, userId) => {
    let user = await User.findById(userId);
    if (user.role !== 'teacher') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Only teachers are allowed to resolve doubts');
    }
    const resolvedDoubt = Doubt.findByIdAndUpdate(id, data)
    return resolvedDoubt
}


module.exports = {
    createDoubt,
    getAllMatchingDoubts,
    getAllPreviousDoubts,
    updateDoubt
}