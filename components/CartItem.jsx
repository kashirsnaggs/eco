import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import {AiFillCheckCircle, AiOutlineCheckCircle, AiOutlineMinus,AiOutlinePlus} from "react-icons/ai"
import {TiDeleteOutline} from "react-icons/ti"
import { Store } from '../context/Store'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/constants'
import toast from 'react-hot-toast'
import axios from 'axios'
import { client, urlFor } from '../lib/client'


const CartItem = ({item,showControls}) => {
        const {_id,name, price,slug,countInStock}=item
        const {state:{cart}, dispatch ,showCart} = useContext(Store)

        const  itemInCart=cart.cartItems.find(x=>x._id===_id)
        const  itemInCartQty=itemInCart ? itemInCart.qty :0
        const [qty, setQty] = useState(0)

        const removeItem=(product)=>{
                dispatch({ type: CART_REMOVE_ITEM, payload:{...product } })
                toast.error(`${item.name} has been removed.`,
                {     duration: 1500,
                        style: {
                        maxWidth: screen.width <800 ? "80vw":"40vw"
                      },
                })
        }
        

        const handleAddToCart=(product,qty)=>{
                const existItem= cart.cartItems.find((x)=> x.slug===product.slug)

                if (qty === 0 ) return toast.error("Select some 😢.")

                dispatch({ type: CART_ADD_ITEM, payload:{_id,name, price,slug, countInStock, image:product.image, qty} })

                toast.success(`${qty} ${item.name} added to cart.`,
                {     duration: 1500,
                        style: {
                        maxWidth: screen.width <800 ? "80vw":"40vw"
                      },
                })
        }

        const plusQty=async()=>{
                const { data } = await axios.get(`/api/products/${_id}`);
                setQty(prev=>{
                       if (data.countInStock > qty) {
                                return prev+1
                       }
                       else{
                                toast.error(`Sorry. ${item.name} is out of stock 😢.`,
                                        {     
                                                duration: 1500,
                                                style: { maxWidth: screen.width <800 ? "80vw":"40vw" }
                                        }
                                )
                                return prev
                       }
                }) 
        }
        const minusQty=()=>{
                        setQty(prev=>prev>0 ? prev-1 : prev)
        }

               
        

        useEffect(() => {
                
                setQty(itemInCartQty)
                 
        }, [itemInCart])
  return (
        <div className="product" >
                <Link  href={`/product/${slug.current}`}>
                        <img className='cart-product-image' src={urlFor(item.image)} alt={item?.name + " product image"} /> 
                </Link>
                <div className="item-desc"   style={{alignSelf: showControls? "center" : "center" }}>
                        <div className="flex top" >
                                <h5> <Link  href={`/product/${slug.current}`}>{item.name}</Link></h5>
                                <h4 className='order-qty-display' style={{display: !showControls? "none" : "flex" }}>{`${item.qty}`}</h4>
                                <h4>${item.price.toLocaleString()}</h4>
                        </div>
                        <div className="flex bottom"  style={{display: showControls? "none" : "flex" }}>
                                <div className="">
                                        <p className="quantity-desc" >
                                                
                                                <span className="" > Quantity : {qty}</span>
                                                
                                        </p>
                                </div>
                                <div>
                                        <button type='button' className='remove-item' onClick={()=>removeItem(item)}>
                                                <TiDeleteOutline/>
                                        </button>
                                </div>
                        </div>
                </div>
        </div>
  )
}

export default CartItem