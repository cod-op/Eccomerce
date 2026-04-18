import JWT from 'jsonwebtoken';


const authUser=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Not authorized login again"
        })
    }

    try{
        const token_decode=JWT.verify(token,process.env.JWT_SECRET)
        if (!req.body) {
            req.body = {};
        }
         req.body.userId=token_decode.id;
         next();
    }catch(error){
        console.log(error);
         res.status(401).json({ 
            success: false,
            message: error.message 
        });
    }
}

export default authUser