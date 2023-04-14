'use strict';

const commune = require('../models/commune');
const district = require('../models/district');
const localite = require('../models/localite');
const region = require('../models/region');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activite', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activite: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_region: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // references: {
        //   table: 'region', // 'regions' would also work
        //   key: 'id_region'
        // }
      },
      id_district: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      id_commune: {  allowNull: false,
        type: Sequelize.INTEGER,
      },
      id_fokotany: {  allowNull: false,
        type: Sequelize.INTEGER,
      },
      localite: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      nb_beneficiare: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      visibite: {
        allowNull: true,
        type: Sequelize.STRING
      },
      date_debut: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      date_fin: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      dure: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      couts: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      partenaires: {
        allowNull: true,
        type: Sequelize.STRING
      },
      indicateur_resultats: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      reception_technique: {
        allowNull: true,
        type: Sequelize.STRING
      },
      reception_provisoire: {
        allowNull: true,
        type: Sequelize.STRING
      },
      reception_definitive: {
        allowNull: true,
        type: Sequelize.STRING
      },
      inauguration: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      observation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      niveau_categorie: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      niveau_sous_categorie: {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('activites');
  }
};