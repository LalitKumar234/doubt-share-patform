
// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define("user", {
//     name: {
//       type: DataTypes.STRING
//     },
//     email: {
//       type: DataTypes.STRING
//     },
//     role: {
//       type: DataTypes.STRING
//     },
//     password: {
//       type: DataTypes.STRING
//     },
//     subject: {
//       type: DataTypes.STRING
//     },
//     language: {
//       type: DataTypes.STRING,
//     }
//   });

//   return User;
// };


// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../db/db.config');

// // const User = sequelize.define("User", {
// //   name: {
// //     type: DataTypes.STRING
// //   },
// //   email: {
// //     type: DataTypes.STRING
// //   },
// //   role: {
// //     type: DataTypes.STRING
// //   },
// //   password: {
// //     type: DataTypes.STRING
// //   },
// //   subject: {
// //     type: DataTypes.STRING
// //   },
// //   language: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   }
// // });

// // module.exports = User;


const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  language: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true,
  },
  subjectsAllowed: [{
    type: String,
  }],
  doubts: [{
    type: mongoose.Types.ObjectId,
    ref: "Doubt",
    required: true
  }],
}
)

userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

// userSchema.statics.areSubjectsAllowed = function (role, subjectsAllowed) {
//   if (role === 'teacher') {
//     return Array.isArray(subjectsAllowed) && subjectsAllowed.length > 0;
//   }
//   else {
//     return Array.isArray(subjectsAllowed) && subjectsAllowed.length === 0;
//   }
// };

const User = mongoose.model("users", userSchema);

module.exports = { User }