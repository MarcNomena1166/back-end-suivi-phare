//imports

const { request, response } = require('express');
var models=require('../models');
const multer = require('multer');
const {insertMultipleActivity,getListActivity,verifyDoublons}=require('../service/activityService.js');


var storage = multer.memoryStorage({
   destination: function(req, file, callback) {
      callback(null, '');
   }
});
var upload = multer({ storage: storage }).any();

module.exports={
    setActivityCSV:async(request,response)=>{
        upload(request, response, async(err) => {

        try{
            const buff=new Buffer.from(request.files[0].buffer,'latin1');
            const lecture=buff.toString('latin1').split('\n')
           console.log(lecture[0]);
            
          
                const result=  await insertMultipleActivity(lecture);
                if(result.status=='success') {
                    return response.status(201).json(result);
                   }
                   else {
                     return response.status(400).json(result);
                   }
    }catch(error){ 
        response.status(400).json(error)
        }
    }); 
    },
    getListActivity:async(request,response)=>{
        try {
            const result= await getListActivity();
            if(result.status=='success'){
                return response.status(201).json(result);
            }
            else {
                return response.status(500).json(result);
            }
        } catch (error) {
            console.log(error);
            return response.status(400).json(error);
        }
    },
    testDoublons:async(request,response)=>{
        upload(request, response, async(err) => {

            try{
                const buff=new Buffer.from(request.files[0].buffer,'latin1');
                const lecture=await buff.toString('latin1').split('\n')
            //    console.log(lecture[0]);
                const testDoublons=await verifyDoublons(lecture);
                console.log(testDoublons);
                
                if(testDoublons.status=='success'){
                    return response.status(201).json(testDoublons);
                }
                else {
                    return response.status(400).json(testDoublons);
                  }
    
              
        }catch(error){ 
            response.status(400).json(error)
            }
        }); 
    }
  
}

