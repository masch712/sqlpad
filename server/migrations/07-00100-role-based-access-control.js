const Sequelize = require('sequelize');
const url = require('url');

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('../lib/config')} config
 * @param {import('../lib/logger')} appLog
 * @param {object} sequelizeDb - sequelize instance
 */
// eslint-disable-next-line no-unused-vars
async function up(queryInterface, config, appLog, sequelizeDb) {
  const backendDatabaseUri = config.get('backendDatabaseUri');
  const urlParts = url.parse(backendDatabaseUri);
  const dialect = backendDatabaseUri
    ? urlParts.protocol.replace(/:$/, '')
    : 'sqlite';
  try {
    // Create roles table
    // Create permissions table
    // Migrate existing user.role values to new tables
    // TODO: transactional?

    await queryInterface.createTable(
      'roleldapgroups',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ldap_group: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        tableName: 'roleldapgroups',
        underscored: true,
      }
    );

    await queryInterface.addIndex('roleldapgroups', {
      fields: ['ldap_group'],
      name: 'roleldapgroups_ldap_group',
    });

    await queryInterface.createTable(
      'roles',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        // TODO: creator?
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        tableName: 'roles',
        underscored: true, // TODO: what does this do? is it useful?  Seems like nobody else is using it in /migrations/*
      }
    );

    await queryInterface.addOrReplaceIndex(
      queryInterface,
      'roles',
      'roles_name',
      ['name'],
      {
        unique: true,
      }
    );
  } catch (error) {
    appLog.error(error, `Error in role-based access control migration`);
  }
}

module.exports = {
  up,
};
