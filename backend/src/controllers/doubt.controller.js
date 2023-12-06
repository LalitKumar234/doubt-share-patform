const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const doubtService = require("../services/doubt.service")

const doubt = catchAsync(async (req, res) => {
    console.log(req.userId, 'request user')
    const newDoubt = await doubtService.createDoubt(req.body, req.userId)
    res.status(httpStatus.OK).send({ success: true, newDoubt })
})

const getDoubts = catchAsync(async (req, res) => {
    if (Object.keys(req.query).length !== 0) {
        let subjects = req.query.subjects.split(",")
        const matchingDoubts = await doubtService.getAllMatchingDoubts(subjects, req.query.language, req.userId)
        res.status(httpStatus.OK).send({ success: true, matchingDoubts })
    }
    else {
        const doubtsHistory = await doubtService.getAllPreviousDoubts(req.userId)
        res.status(httpStatus.OK).send({ success: true, studentDoubtHistory: doubtsHistory })
    }
})

const resolveDoubt = catchAsync(async (req, res) => {
    console.log(req.body)
    const doubt = await doubtService.updateDoubt(req.body, req.params.id, req.userId)
    res.status(httpStatus.OK).send({ success: true, doubt })
})

module.exports = {
    doubt,
    getDoubts,
    resolveDoubt
};