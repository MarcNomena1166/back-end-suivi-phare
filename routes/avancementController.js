const {insertMultipleAvancementCSV}=require('../service/avancementService.js');
const multer = require('multer');
var storage = multer.memoryStorage({
    destination: function(req, file, callback) {
       callback(null, '');
    }
 });
 var upload = multer({ storage: storage }).any();
 
module.exports={
    setAvancement:async(request,response)=>{
        upload(request, response, async(err) => {
            try {
                const buff=new Buffer.from(request.files[0].buffer,'latin1');
                const lecture=buff.toString('latin1').split('\n')

                await insertMultipleAvancementCSV(lecture);
                console.log(lecture)
            } catch (error) {
                console.log(error);
            }


        });
    }
}