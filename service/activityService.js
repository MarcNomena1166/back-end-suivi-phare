const {customQuery}=require('./databaseConnection.js');
const {dateIsValid}=require('../utils/DateHelper.js');
const { QueryTypes } = require('sequelize');
var models=require('../models');
module.exports={
    insertMultipleActivity:async(data)=>{

        var increment=0;

        try{
        for (let i=0;i<data.length-1;i++){

            const detailActivite=data[i].split(';');
            const region=await customQuery("select * from regions where nom_region=UPPER('"+detailActivite[1]+"')",QueryTypes.SELECT);
            const district=await customQuery("select * from districts where nom_district=UPPER('"+detailActivite[2]+"')",QueryTypes.SELECT);
            const commune=await customQuery("select * from communes where nom_commune=UPPER('"+detailActivite[3]+"')",QueryTypes.SELECT);
            const fokotany=await customQuery("select * from fokotanies where nom_fokotany=UPPER('"+detailActivite[4]+"')",QueryTypes.SELECT);

       // 
        //    console.log(fokotany);

            const dateDebut=new Date(detailActivite[8].split('/')[2], detailActivite[8].split('/')[1]-1, detailActivite[8].split('/')[0]);
            const dateFin=new Date(detailActivite[9].split('/')[2], detailActivite[9].split('/')[1]-1, detailActivite[9].split('/')[0]);
            console.log(dateIsValid(dateFin));
    
    
            const activite= models.activite.create({
                activite: detailActivite[0],
                id_region: region[0].id,
                id_district: district[0].id,
                id_commune: commune[0].id,
                id_fokotany:fokotany[0].id,
                localite: detailActivite[5],
                nb_beneficiare: detailActivite[6],
                visibite: detailActivite[7],
                date_debut:await dateIsValid(dateDebut)?dateDebut:null,
                date_fin:await dateIsValid(dateFin)?dateFin:null,
                dure: detailActivite[10],
                couts: detailActivite[11],
                partenaires: detailActivite[12],
                indicateur_resultats: detailActivite[13],
                reception_technique: detailActivite[14],
                reception_provisoire: detailActivite[15],
                reception_definitive: detailActivite[16],
                inauguration: detailActivite[17],
                observation: detailActivite[18],
                niveau_categorie:detailActivite[19],
                niveau_sous_categorie:detailActivite[20].replace('\r',''),
            });

         //   await activite.save();
        //   console.log(activite);
            increment++;
        }
    }catch(error){
        console.log(error);
        throw {
            status:"error",
            message:"error with "+increment+" activity registered,please check integrity of the data that you put"
        }
    }
       
            return{
                status:"success",
                message:increment+" activity was registered"
        }
   
    },
    getListActivity:async()=>{
        try {
            const result= await customQuery("select * from filtre_activity",QueryTypes.SELECT);
            const listActivity=[];
 //           console.log(result)
            
            for(let i=0;i<result.length;i++){
                const act=result[i];
                act.appreciation= await module.exports.calculeAppreciation(result[i].date_debut,result[i].dure,result[i].avancement);
                listActivity.push(act);
            }
                
            return{
                 status:"success",
                 data:listActivity
            };
        } catch (error) {
            console.log(error);
            return {
                status:"error",
                message:error
            };
        }
      
    },
    verifyDoublons:async(data)=>{
        var ligne=0;
        const ligneDoublons=[];
        try {

            for (let i=0;i<data.length-1;i++){
            ligne++;
            const detailActivite=await data[i].split(';');
            const region=await customQuery("select * from regions where nom_region=UPPER('"+detailActivite[1]+"')",QueryTypes.SELECT);
            const district=await customQuery("select * from districts where nom_district=UPPER('"+detailActivite[2]+"')",QueryTypes.SELECT);
            const commune=await customQuery("select * from communes where nom_commune=UPPER('"+detailActivite[3]+"')",QueryTypes.SELECT);
            const fokotany=await customQuery("select * from fokotanies where nom_fokotany=UPPER('"+detailActivite[4]+"')",QueryTypes.SELECT);
            
       // 
            console.log(detailActivite);

            const dateDebut=new Date(detailActivite[8].split('/')[2], detailActivite[8].split('/')[1]-1, detailActivite[8].split('/')[0]);
            const dateFin=new Date(detailActivite[9].split('/')[2], detailActivite[9].split('/')[1]-1, detailActivite[9].split('/')[0]);
            console.log(dateIsValid(dateFin));
    
    
            const activite= await models.activite.build({
                activite: detailActivite[0],
                id_region: region[0].id,
                id_district: district[0].id,
                id_commune: commune[0].id,
                id_fokotany:fokotany[0].id,
                localite: detailActivite[5],
                nb_beneficiare: detailActivite[6],
                visibite: detailActivite[7],
                date_debut:await dateIsValid(dateDebut)?dateDebut:null,
                date_fin:await dateIsValid(dateFin)?dateFin:null,
                dure: detailActivite[10],
                couts: detailActivite[11],
                partenaires: detailActivite[12],
                indicateur_resultats: detailActivite[13],
                reception_technique: detailActivite[14],
                reception_provisoire: detailActivite[15],
                reception_definitive: detailActivite[16],
                inauguration: detailActivite[17],
                observation: detailActivite[18],
                niveau_categorie:detailActivite[19],
                niveau_sous_categorie:detailActivite[20].replace('\r',''),
            });

         const doublons=   await  models.activite.findOne({where:{activite:activite.activite,
            id_region:activite.id_region,
            id_district:activite.id_district,
            id_commune:activite.id_commune,
            id_fokotany:activite.id_fokotany,
            localite:activite.localite,
            nb_beneficiare:activite.nb_beneficiare,
            visibite:activite.visibite,
            dure:activite.dure,
            couts:activite.couts,
            partenaires:activite.partenaires,
            indicateur_resultats:activite.indicateur_resultats,
            reception_technique:activite.reception_technique,
            reception_provisoire:activite.reception_provisoire,
            reception_definitive:activite.reception_definitive,
            observation:activite.observation,
            niveau_categorie:activite.niveau_categorie,
            niveau_sous_categorie:activite.niveau_sous_categorie}});
       
    //    console.log("lingr 147 :"+doublons);

        if(doublons instanceof models.activite)ligneDoublons.push(ligne);
        console.log("linge 155 :"+ligne);
        }
        console.log("linge 153 :"+data.length);
        if(ligne==data.length-1){
            
            return{
                status:"success",
                message:"number of doublons: "+ligneDoublons.length,
                ligne:ligneDoublons
            }
        }
        } catch (error) {
            console.log(error);
            return{
                status:"error",
                message:error
            }
        }
    },

    calculeAppreciation:async(date_debut,dure,avancement)=>{
        const diffInDays = Math.floor((new Date()-new Date(date_debut)) / (1000 * 60 * 60 * 24));
        const ideal=(100*diffInDays)/dure;

    //    console.log(ideal,avancement,dure);

        if(avancement<ideal && avancement<100) return "lent"
        if(avancement>=ideal && avancement<100) return "satisfaisant"
        if(avancement>=100) return "inaugurable"
        // console.log(new Date(date_debut));
        // console.log(ideal,avancement,dure);
        // console.log(diffInDays);
    }

}