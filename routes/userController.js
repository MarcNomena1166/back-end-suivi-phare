//imports
var bcrypt=require('bcrypt');
const { request, response } = require('express');
var customJWT =require('../utils/customJWT');
var models=require('../models');
// routes
module.exports={
    register:(request,response)=>{
        const email=request.body.email;
        const mdp=request.body.mdp;
        const isAdmin=request.body.isAdmin;

        if(email==='' || mdp===''){
            response.status(400).json({'error':'fill all the fields '})
        }

         models.user.findOne({
            where:{email:email}
            }).then(res=>{              
                if(res===null){                   
                    models.user.create({
                        email:email,
                        mdp:mdp,
                        is_admin:isAdmin
                    }).then(res => {
                        response.status(201).json({'newUser':res})
                    }).catch((error) => {
                        console.error('Failed to create a new record : ', error);
                    });
                }
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });

    


       
    },
    login: async (request,response)=>{
     //   console.log(request.body);
        const email=request.body.email;
        const mdp=request.body.mdp;
      //  const isAdmin=request.body.isAdmin;
       // console.log(request.body.params);

        if(email==='' || mdp===''|| email===undefined ||mdp===undefined){
        return response.status(400).json({'error':'fill all the fields '})
        }

        const userfound = await models.user.findOne({
             where: { email: email,mdp:mdp } 
            
            });
                if (userfound === null) {
                    response.status(401).json({'error':'error credentials ,email or password is wrong '})
                } else {
                    const token= await customJWT.generatingTokenUser(userfound);
                    response.status(201).json(
                        {
                            'user_connected':userfound,
                            'token':token
                        }
                        )
                }
      //  response.json({'test':'drive'})
    },
    //middleware authentification
    getUserProfile:async(request,response,next)=>{
        const headerAuth=request.headers['authorization'];
        const user_id= await customJWT.getUserId(headerAuth);

        if(user_id<0) return response.status(400).json({'error':'wrong token is taken'})
        const userfound = await models.user.findOne({
            where: { id: user_id }  
           });
           if (userfound === null) {
            return response.status(400).json({'error':'user not found '});
        } else {
            next();
        }
    },
    middlewareAuthentification:async(request,response,next)=>{
        console.log('using the authentification middleware now');
        next();
    }
}

