
import { v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';



const addProduct=async(req,res)=>{

      try{
         const { name, description, price, category, subCategory, sizes, bestsellers } = req.body;

         const image1 = req.files.image1 && req.files.image1[0];
         const image2 = req.files.image2 && req.files.image2[0];
         const image3 = req.files.image3 && req.files.image3[0];
         const image4 = req.files.image4 && req.files.image4[0];

       
        // images ko array mein convert karein
         const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Cloudinary par upload karna
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                // IMPORTANT: Ensure item.path exists (provided by Multer)
                const result = await cloudinary.uploader.upload(item.path, { 
                    resource_type: 'image' 
                });
                return result.secure_url;
            })
         );

        console.log("Uploaded URLs:", imagesUrl);
  
        const productData = {
            name: name.trim(),
            description: description.trim(),
            category: category.trim(),
            price:Number(price),
            subCategory:subCategory.trim(),
            bestsellers:bestsellers==="true"?true:false,
            sizes:JSON.parse(sizes),
            images:imagesUrl,
            date:Date.now()
        }
        console.log(productData);
        
       const product = new productModel(productData);
        await product.save();

        res.status(201).json({ 
            success: true, 
            message: "Product Added Successfully",
            data: product 
        });

      } catch(error){
           console.log(error);
           res.status(500).json({ 
              success: false,
              message: error.message });
      }
  }


const listProduct=async(req,res)=>{
         try{
          const products=await productModel.find({});
          res.status(201).json({ 
            success: true, 
            products
        });
       }
         catch(error){
           console.log(error);
           res.status(500).json({ 
              success: false,
              message: error.message });
      }
}


const removeProduct=async(req,res)=>{
       try{

          await productModel.findByIdAndDelete(req.body.id);

          res.status(201).json({ 
            success: true, 
           message:"Product removed Successsfully"
        });
       }catch(error){
             console.log(error);
             res.status(500).json({ 
              success: false,
              message: error.message });
       }
}

//function for single product info
const singleProduct=async(req,res)=>{
      try{
        const {productId}=req.body;
        const product=await productModel.findById(productId);

        res.status(201).json({ 
            success: true, 
            product
        });
      }catch(error){
          console.log(error);
          res.status(500).json({ 
          success: false,
          message: error.message });
      }
}

export {addProduct,listProduct,removeProduct,singleProduct}