// imports
var express=require('express')
var userController=require('./routes/userController')
var activiteController=require('./routes/activiteController')
var avancementController=require('./routes/avancementController')
var localisationController=require('./routes/localisationController')
//router
exports.router=(function(){
    var apiRouter=express.Router();
   // activity Route
    apiRouter.route('/activity/setActivity/').post(activiteController.setActivityCSV);
    apiRouter.route('/activity/List/').get(activiteController.getListActivity);
    apiRouter.route('/activity/verifyDoublons/').post(activiteController.testDoublons);
    //user Route
    apiRouter.route('/users/register/').post(userController.register);
    apiRouter.route('/users/login/').post(userController.login);
    apiRouter.route('/users/info/').get(userController.getUserProfile);
   //avancement route 
    apiRouter.route('/avancement/setAvancement/').post(avancementController.setAvancement);
   //localisation route
    apiRouter.route('/localisation/liste/').get(localisationController.getListeLocalisationActivity);
    return apiRouter;
})();