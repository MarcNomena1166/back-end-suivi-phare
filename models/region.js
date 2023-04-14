'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.activite,{sourceKey:'id',foreignKey:'id_region'});
      // define association here
    }
  }
  region.init({
    nom_region: DataTypes.STRING,
    longitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'region',
    timestamps: false
  });
  return region;
};