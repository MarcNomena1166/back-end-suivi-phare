var jwt =require('jsonwebtoken');

const JWT_SECRET='QIdC0SwrmDY2VgVLyvkvpy6bzTZcdOOF';
module.exports={
    generatingTokenUser:async(userData)=>{
        const token= await jwt.sign({
            user_id:userData.id,
            is_admin:userData.is_admin
        },JWT_SECRET,
        {expiresIn:'1h'}
        );
       // console.log(token);
        return token;
    },
    parseAuthorization:async (authorization)=>{
        return (authorization!=null) ? authorization.replace('Bearer ',''):null;
    },
    getUserId:async(authorization)=>{
        var id=-1;
        const token=await module.exports.parseAuthorization(authorization);
        console.log(token);
        if(token!=null) {
            try{
                const jwtoken= await jwt.verify(token,JWT_SECRET);
                if(jwtoken!=null)
                {
                    id=jwtoken.user_id;
                    console.log("id "+id);
                }
                
            }catch(error){
                console.log(error);
            }
        }
        return id;
    }
}