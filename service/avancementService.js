const { where } = require('sequelize');
var models=require('../models');
module.exports={
    insertMultipleAvancementCSV:async(data)=>{
        var increment=0;
        try {
            for (let i=0;i<data.length-1;i++){
                const detailAvancement=data[i].split(';');
                const id_activite=detailAvancement[0];
                const avancement=detailAvancement[1];

               await models.avancement.update({avancement: avancement},
                        {where:{id_activite:id_activite}}
                    );
                increment++;
            }
            return{status:"success",message:increment+ " rows succeeded"};
        } catch (error) {
            
        }
    }
}