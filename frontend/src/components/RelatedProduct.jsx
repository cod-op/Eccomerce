import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react';
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({category,subCategory}) => {

const {products}=useContext(ShopContext);
const[related,setRelated]=useState([]);

useEffect(()=>{
     if(products.length>0){
        let productCopy=products.slice();
         productCopy=productCopy.filter((item)=>category===item.category);
         productCopy=productCopy.filter((item)=>subCategory===item.subCategory);
        //  console.log(productCopy.slice(0,5));
        setRelated(productCopy.slice(0,5));
      }
    },[])

  return (
    <div className='my-24'>
          <div className='text-center text-3xl py-2'>
                 <Title text1={'Related'} text2={'Product'}/>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 gap-y-6' >
                 {related.map((item,index)=>(
                   <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.images}/>
                 ))}
          </div>
    </div>
  )
}

export default RelatedProduct