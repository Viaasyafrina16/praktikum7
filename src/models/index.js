const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.ApiKey = require('./apikey')(sequelize, Sequelize.DataTypes);
db.Admin = require('./admin')(sequelize, Sequelize.DataTypes);


// Relasi
db.User.hasMany(db.ApiKey, { foreignKey: 'userId' });
db.ApiKey.belongsTo(db.User, { foreignKey: 'userId' });


module.exports = db;