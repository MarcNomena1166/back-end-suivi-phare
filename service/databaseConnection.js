const { Sequelize, QueryTypes } = require('sequelize');

module.exports={
    customQuery:async(queryString,querytype)=>{
        const sequelize = new Sequelize('suivi_phare', 'postgres', 'mdpprom13', {
            dialect: 'postgres'
          });

          const result=await sequelize.query(queryString,{ type: querytype });
          sequelize.close();
          return result;
    }
}