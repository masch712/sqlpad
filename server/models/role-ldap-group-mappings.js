const ensureJson = require('./ensure-json');

class RoleLdapGroupMappings {
  /**
   * @param {import('../sequelize-db')} sequelizeDb
   * @param {import('../lib/config')} config
   */
  constructor(sequelizeDb, config) {
    this.sequelizeDb = sequelizeDb;
    this.config = config;
  }

  async create(data) {
    const { ...rest } = data;

    const newMapping = await this.sequelizeDb.RoleLdapGroupMappings.create(
      rest
    );
    return this.findOneById(newMapping.id);
  }

  async findOneById(id) {
    const mapping = await this.sequelizeDb.RoleLdapGroupMappings.findOne({
      where: { id },
    });
    if (mapping) {
      let final = mapping.toJSON();
      final.data = ensureJson(final.data);
      return final;
    }
  }
}

module.exports = RoleLdapGroupMappings;
