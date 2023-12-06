const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/errorhandler.middleware");
require("dotenv").config();


const app = express();

app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use(cors());
app.options("*", cors());

app.use("/v1", routes);

app.get("/", (req, res) => {
    res.send('hello world')
})

// app.use(errorHandler)

// const jsonErrorHandler = (err, req, res, next) => {
//     res.send({ error: err.message });
// }


module.exports = app;