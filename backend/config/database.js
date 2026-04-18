import mongoose from "mongoose";
 
const  dbconnect= async()=>{
     await  mongoose.connect(process.env.MONGODB_URL)

    .then(()=>console.log("DB connection is successfully"))
    .catch(err=>console.log(err))
}

export default dbconnect;

