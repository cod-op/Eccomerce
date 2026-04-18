import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import  CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const [method,setMethod]=useState('cod');
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_charge,products}=useContext(ShopContext);

  const [formdata,setFormdata]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
    });


    const onChangeHandler=async(e)=>{
       const name=e.target.name
       const value=e.target.value
       setFormdata(data=>({...data,[name]:value}))
    }

    const initPayment = (orderData) => {
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Order Payment",
        description: "Order Payment",
        order_id: orderData.id,
        receipt:orderData.receipt,
        
        handler: async (response) => {
            console.log(response);
            try {
               
                const { data } = await axios.post(backendUrl+"/api/order/verifyRazorpay", response,{headers:{token}});

                if (data.success) {
                    toast.success("Order successfully placed!"); 
                    navigate('/orders');
                    setCartItems({});
                }
             } catch (error) {
                   console.log(error);
                   toast.error("Payment verification failed!");
             }
        },
       
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};

    const onSubmitHandler=async(e)=>{
       e.preventDefault();
       try{
          let orderItems = [];

          for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    const itemInfo = structuredClone(products.find(product => product._id === items));
                    if (itemInfo) {
                        itemInfo.size = item;
                        itemInfo.quantity = cartItems[items][item];
                        orderItems.push(itemInfo);
                    }
                }
            }
        }
     //    console.log(orderItems);

        let orderData = {
            address: formdata,
            items: orderItems,
            amount: getCartAmount() + delivery_charge
        };

        switch (method) {
            case 'cod':
              
                const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}});
                   if(response.data.success) {
                      setCartItems({});
                      navigate('/orders');
                   }else{
                    toast.error(response.data.message);
                   }
                 console.log("COD Order Data:", orderData);

                  break;

            case 'stripe':
                   const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: {token}});
                  if(responseStripe.data.success) {
                     const {session_url}=responseStripe.data
                     window.location.replace(session_url)
                   }else{
                    toast.error(responseStripe.data.message);
                   }
                    console.log("Stripe Order Data:", orderData);
                  break;

            case 'razorpay':
                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers: {token}});
                         if(responseRazorpay.data.success) {
                            initPayment(responseRazorpay.data.order)
                            
                         }else{
                         toast.error(responseRazorpay.data.message);
                         }
                    console.log("Razorpay Order Data:", orderData);
             default:
                break;
        }

       }catch(error){
            console.log(error);
            toast.error(error.message);
       }
    }





  return ( 
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

        {/* left side */}
        <div className='flex flex-col gap-4 w-full sm:max-w-120'>
             <div className='text-xl sm:text-2xl my-3'>
                   <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
             </div> 

             <div className='flex gap-3'>
                  <input onChange={onChangeHandler} name="firstName" value={formdata.firstName} type="text"  placeholder='First name' required className='border-2 border-gray-300 rounded py-1.5 px-3.5 w-full'/>
                   <input onChange={onChangeHandler} name="lastName" value={formdata.lastName}  type="text"  placeholder='Last name' required  className='border-2 border-gray-300 rounded py-1.5 px-3.5 w-full'/>
             </div> 

              <input onChange={onChangeHandler} name="email" value={formdata.email}  type="email"  placeholder='Enter your email' required  className='border-2 border-gray-300 rounded py-1.5 px-3.5 w-full'/> 
              <input onChange={onChangeHandler} name="street" value={formdata.street}  type="text"  placeholder='Street' required  className='border-2 border-gray-300 rounded py-1.5 px-3.5 w-full'/>

              <div className='flex gap-3'>
                  <input onChange={onChangeHandler} name="city" value={formdata.city}  type="text"  placeholder='City' required  className='border-2 border-gray-300 rounded py-1.5 px-3.5 w-full'/>
                  <input onChange={onChangeHandler} name="state" value={formdata.state}  type="text"  placeholder='State' required  className='border-2 border-gray-300 rounded py-1.5 px-3.5 w-full'/>
              </div> 

              <div className='flex gap-3'>
                  <input onChange={onChangeHandler} name="zipcode" value={formdata.zipcode}  type="number"  placeholder='Zipcode' required  className='border-2 border-gray-300 rounded py-1.5 px-3.5 w-full'/>
                   <input onChange={onChangeHandler} name="country" value={formdata.country}  type="text"  placeholder='Country' required  className='border-2 border-gray-300 rounded py-1.5 px-3.5 w-full'/>
             </div> 

              <input onChange={onChangeHandler} name="phone" value={formdata.phone}  type="number"  placeholder='7895546123'  required  className='border-2 border-gray-300 rounded py-1.5 px-3.5 w-full'/>

        </div>

        {/* right side */}
        <div className='mt-8'>
              <div className='mt-8 min-w-80'>
                   <CartTotal/>
              </div>

              <div className='mt-12'>
                   <Title text1={'PAYMENT'} text2={'METHOD'}/>
                   {/* Payment method selection */}
                   <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border-2 border-gray-300 p-2 px-3 cursor-pointer' >
                             <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe' ? 'bg-green-400':''}`}></p>
                             <img src={assets.stripe_logo} alt=""  className='h-5 mx-4'/>
                        </div>

                        <div onClick={()=>setMethod('razorpay')}  className='flex items-center gap-3 border-2 border-gray-300 p-2 px-3 cursor-pointer'>
                             <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay' ? 'bg-green-400':''}`}></p>
                             <img src={assets.razorpay_logo} alt=""  className='h-5 mx-4'/>
                        </div>

                        <div onClick={()=>setMethod('cod')}  className='flex items-center gap-3 border-2 border-gray-300 p-2 px-3 cursor-pointer'>
                             <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod' ? 'bg-green-400':''}`}></p>
                             <p className='text-gray-600 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                   </div>

                <div className='w-full text-end mt-8'>
                   <button  type="submit" className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                </div>

              </div>

        </div>

     </form>
  )
}

export default PlaceOrder