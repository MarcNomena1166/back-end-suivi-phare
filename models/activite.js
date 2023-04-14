'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.region, {as: 'region_activity_fk',foreignKey:'id', sourceKey:'id_region'} );
      this.belongsTo(models.fokotany, {as: 'fokotany_activity_fk',foreignKey:'id', sourceKey:'id_fokotany'} );
      this.belongsTo(models.district, {as: 'district_activity_fk',foreignKey:'id', sourceKey:'id_district'} );
      this.belongsTo(models.commune, {as: 'commune_activity_fk',foreignKey:'id', sourceKey:'id_commune'} );
      this.hasOne(models.avancement,{sourceKey:'id',foreignKey:'id_activite'});
    }
  }
  activite.init({
    activite: DataTypes.STRING,
    id_region: DataTypes.INTEGER,
    id_district: DataTypes.INTEGER,
    id_commune: DataTypes.INTEGER,
    id_fokotany: DataTypes.INTEGER,
    localite: DataTypes.STRING,
    nb_beneficiare: DataTypes.INTEGER,
    visibite: DataTypes.STRING,
    date_debut: DataTypes.DATEONLY,
    date_fin: DataTypes.DATEONLY,
    dure: DataTypes.INTEGER,
    couts: DataTypes.DOUBLE,
    partenaires: DataTypes.STRING,
    indicateur_resultats: DataTypes.DOUBLE,
    reception_technique: DataTypes.STRING,
    reception_provisoire: DataTypes.STRING,
    reception_definitive: DataTypes.STRING,
    inauguration: DataTypes.DATEONLY,
    observation: DataTypes.STRING,
    niveau_categorie:DataTypes.INTEGER,
    niveau_sous_categorie:DataTypes.INTEGER,
   
  }, {
    sequelize,
    modelName: 'activite',
    freezeTableName:true,
    timestamps: false
  });
  return activite;
};