// module.exports = (sequelize, DataTypes) => {
//     const Doubt = sequelize.define("user", {
//         subject: {
//             type: DataTypes.STRING
//         },
//         language: {
//             type: DataTypes.STRING
//         },
//         doubt: {
//             type: DataTypes.STRING
//         }
//     });

//     return Doubt;
// };

const mongoose = require("mongoose");

const doubtSchema = mongoose.Schema({
    doubtTitle: {
        type: String,
        required: true,
    },
    doubtContent: {
        type: String,
        required: true,
    },
    language:{
        type: String,
    },
    subject: {
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
},{ timestamps: true })

const Doubt = mongoose.model("doubts", doubtSchema);

module.exports = { Doubt }