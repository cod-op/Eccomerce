import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import dbconnect from './config/database.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



connectCloudinary();
const app=express();
const port=process.env.PORT || 5500;

//middleware
app.use(express.json());
app.use(cors());

dbconnect();




app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working") 
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})




