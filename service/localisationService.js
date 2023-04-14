const {customQuery}=require('./databaseConnection.js');
const { QueryTypes } = require('sequelize');
module.exports={
    getRegionFromActivity:async(localisation)=>{
        try {
            const listeLocalisation={};
            listeLocalisation.listeRegion= await customQuery("SELECT activite.id_region,regions.nom_region  FROM activite join regions on regions.id=activite.id_region group by activite.id_region,regions.nom_region",QueryTypes.SELECT);
            listeLocalisation.listeDistrict= await customQuery("SELECT activite.id_district,districts.nom_district FROM activite join districts on districts.id=activite.id_district group by activite.id_district,districts.nom_district",QueryTypes.SELECT);
            listeLocalisation.listeCommune= await customQuery(" SELECT activite.id_commune,communes.nom_commune FROM activite join communes on communes.id=activite.id_commune group by activite.id_commune,communes.nom_commune",QueryTypes.SELECT);
            return{
                status:"success",
                data:listeLocalisation
           };
        } catch (error) {
            console.log(error);
            return{
                status:"error",
                message:error
           };
        }
    }
}