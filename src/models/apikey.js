module.exports = (sequelize, DataTypes) => {
const ApiKey = sequelize.define('ApiKey', {
api_key: { type: DataTypes.STRING(255), allowNull: false },
out_of_date: { type: DataTypes.DATE, allowNull: false },
status: { type: DataTypes.BOOLEAN, defaultValue: false },
userId: { type: DataTypes.INTEGER, allowNull: true }
}, {
tableName: 'apikeys',
underscored: true,
});


return ApiKey;
};