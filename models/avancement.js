'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class avancement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.activite, {as: 'avancement_activity_fk',foreignKey:'id', sourceKey:'id_activite'});
    }
  }

  avancement.init({
    id_activite: DataTypes.INTEGER,
    avancement: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'avancement',
    freezeTableName:true,
    timestamps: false
  });
  return avancement;
};