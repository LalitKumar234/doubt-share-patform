const errorHandler = (error, req, res, next) =>{
    res.status(error.statusCode || 500)
    .json(error || 'something went wrong')
}
module.exports = {
    errorHandler
}