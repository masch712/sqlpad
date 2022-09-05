const ensureJson = require('./ensure-json');

class Roles {
  /**
   * @param {import('../sequelize-db')} sequelizeDb
   * @param {import('../lib/config')} config
   */
  constructor(sequelizeDb, config) {
    this.sequelizeDb = sequelizeDb;
    this.config = config;
  }

  async create(data) {
    const newRole = await this.sequelizeDb.Roles.create(data);
    return this.findOneById(newRole.id);
  }

  async findOneById(id) {
    const role = await this.sequelizeDb.Roles.findOne({ where: { id } });
    if (role) {
      let final = role.toJSON();
      final.data = ensureJson(final.data);
      return final;
    }
  }
}

module.exports = Roles;
