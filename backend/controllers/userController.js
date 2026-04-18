import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'



const generateToken = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET,{ expiresIn: '24h' });
};

const loginUser=async(req,res)=>{
        try{
               const {email,password}=req.body;

               if (!email || !password) {
                 return res.status(400).json({ 
                   success: false,
                   message: "Please provide email and password" });
               }

              const user=await userModel.findOne({email});  

              if(!user){
                return res.status(400).json({
                 success:false,
                 message:"Invalid email or password",
               })
              }
       
              const isMatch = await bcrypt.compare(password, user.password);
               if (!isMatch){
                  return res.status(400).json({
                     success:false,
                     message: 'Invalid credentials'
                     })
                 }

             const token=generateToken(user._id); 
       
                res.json({
                  success:true,
                  message:"User login successfully",
                   token
               });
              }
                catch(err){
                    console.log(err);
                     res.status(500).json(
                      {
                      success:false,
                      message:"Server Error"
                     }
             )}
}

const registerUser=async(req,res)=>{
           try{
                const {name,email,password}=req.body;
                if(!name || !email || !password){
                 return res.status(400).json({
                     success:false,
                     message:"All field required"
                 })
                }
                 
                const existUser= await userModel.findOne({email});
                  if (existUser){
                      return res.status(409).json({ 
                        success:false,
                        message: 'User Already Exists' 
                  })
                }

                //validating email format & strong password
                if(!validator.isEmail(email)){
                        return res.status(400).json({ 
                           success:false,
                           message: 'Please enter a valid email' 
                    })
                  }

                 if(password.length<8){
                       return res.status(409).json({ 
                           success:false,
                           message: 'Please enter a strong password atleast 8 character' 
                    })
                 } 
     
               //hash user password
                const salt= await bcrypt.genSalt(10);
                const hashPassword=await bcrypt.hash(password,salt);
     
                 const user = await userModel.create({
                          name,
                          email,
                          password: hashPassword,
                         
             });

              const token=generateToken(user._id); 

                res.status(201).json({
                success: true,
                message: 'User registered successfully',
                token
            });

            } catch(err){
                  console.log(err);
                   res.status(500).json({
                    success:false,
                    message:"Server Error"
                   }
             )}
        }

    const adminLogin=async(req,res)=>{
       try{
         const {email,password}=req.body;
           if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
               const token=JWT.sign(email+password,process.env.JWT_SECRET);
               res.json({
                success:true,
                token
               })
           }
       }catch(error){
          console.log(error);
            res.status(500).json({
            success:false,
            message:"Server Error"
                }
           )}
       
    }


    const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).select('-password'); // Password hide rakhein
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



    const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address } = req.body;
        await userModel.findByIdAndUpdate(userId, { name, phone, address });
        res.json({ success: true, message: "Profile Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export {loginUser,registerUser,adminLogin,getProfile, updateProfile}
