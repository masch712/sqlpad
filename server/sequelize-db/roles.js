const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  const Roles = sequelize.define(
    'Roles',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // TODO: creator?
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'roles',
      underscored: true,
    }
  );

  return Roles;
};
