const {getRegionFromActivity}=require('../service/localisationService')
module.exports={
    getListeLocalisationActivity:async(request,response)=>{
        try {
            const result =await getRegionFromActivity();
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
    }
}