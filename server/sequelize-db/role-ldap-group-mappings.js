const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  const Users = sequelize.define(
    'RoleLdapGroups',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ldapGroup: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'roleldapgroups',
      underscored: true,
    }
  );

  return Users;
};
