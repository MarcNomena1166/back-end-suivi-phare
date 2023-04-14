'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fokotany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.activite,{sourceKey:'id',foreignKey:'id_fokotany'});
    }
  }
  fokotany.init({
    nom_fokotany: DataTypes.STRING,
    longitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'fokotany',
    timestamps: false
  });
  return fokotany;
};