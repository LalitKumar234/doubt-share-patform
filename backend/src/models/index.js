// const dbConfig = require("../db/db.config.js");

// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,

//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle
//     }
// });

// sequelize.authenticate()
//     .then(() => {
//         console.log('connected')
//     })
//     .catch((err) => {
//         console.log(err)
//     })

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;


// db.users = require("./user.model.js")(sequelize, DataTypes);
// db.doubt = require("./doubt.model.js")(sequelize, DataTypes);

// // db.users.hasMany(db.doubt, { foreignKey: 'studentId' })

// module.exports = db;


  module.exports.User = require('./user.model').User
  module.exports.Doubt = require('./doubt.model').Doubt