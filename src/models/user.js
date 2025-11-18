module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
firstname: { type: DataTypes.STRING, allowNull: false },
lastname: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
tableName: 'users',
underscored: true,
});


return User;
};