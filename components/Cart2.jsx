import React, { useContext } from 'react'
import Link from 'next/link'
import {AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping, AiOutlineShoppingCart} from "react-icons/ai"
import {TiDeleteOutline} from "react-icons/ti"
import {toast} from "react-hot-toast"
import getStripe from '../lib/getStripe'
import { Store } from '../context/Store'
import { CART_REMOVE_ITEM } from '../constants/constants'
import CartItem from './CartItem'
import {  useRouter } from 'next/router'
import {motion} from "framer-motion"
import { useSession } from 'next-auth/react'
// import { useStateContext } from '../context/StateContext'



const Cart = () => {
        const router=useRouter()
        const {state:{cart}, dispatch, setShowCart ,showCart} = useContext(Store)
        const {data: session}= useSession()

     


        const removeItem=(product)=>{
               dispatch({type: CART_REMOVE_ITEM ,payload:{product}})
        }


        
        
  return (
    <div className='cart-wrapper' >
        <motion.div initial={{ x: "100%" }}   animate={{x: 0 }}   exit={{x: "100%" }}     transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}  className="cart-container">
                <button type='button' className='cart-heading' onClick={()=>setShowCart(false)}>
                        <AiOutlineLeft/>
                        <span className='heading'>Your Cart</span>
                        <span className='cart-num-items'>( {cart.cartItems.reduce((a, c)=> a + c.qty , 0)} items)</span>
                </button>

                {
                        cart.cartItems.length<1 && (
                                <div className='empty-cart'>
                                        <AiOutlineShoppingCart   size={150}/>
                                        <h3>Your shopping bag is empty</h3>
                                        <Link href={"/"}>
                                                <button type='button' onClick={()=>setShowCart(false)} className="btn">
                                                        Continue Shopping
                                                </button>
                                        </Link>
                                </div> 
                        )
                }

                <div className="product-container">
                        {
                                cart.cartItems.length>=1 && cart.cartItems.map((item)=>(
                                        <CartItem item={item} key={item._id}/>
                                ))
                        }
                </div>

                {!cart.cartItems.length==0 && (
                        <div className="cart-bottom">
                                <div className="total">
                                        <h3>Sub-total:</h3>
                                        <h3>${cart.cartItems.reduce((a,c)=>a+ c.qty * c.price,0).toLocaleString()}</h3>
                                </div>
                                <div className="btn-container">
                                        <button type='button' className='btn' onClick={()=>{ router.push(session?.user? "/shipping":"/login?redirect=/shipping") && (setShowCart(false))} }>
                                                Check Out
                                        </button>  
                                </div>
                        </div>
                )}
        </motion.div>
    </div>
  )
}

export default Cart