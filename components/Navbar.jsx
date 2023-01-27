import React, { Fragment, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {AiOutlineFacebook, AiOutlineShopping} from "react-icons/ai"
import {FaRegUserCircle} from "react-icons/fa"
import Cookies from "js-cookie"
import Cart from './Cart2'
import { Store } from '../context/Store'
import {  useRouter } from 'next/router'
import { useSession,signOut } from "next-auth/react";
import { Menu, Transition } from '@headlessui/react'
import { DropdownLink } from './DropdownLink'
import {motion} from "framer-motion"
import Script from 'next/script'
import { CART_EMPTY } from '../constants/constants'




// import {useStateContext} from "../context/StateContext"


const Navbar = () => {
        const router=useRouter()
        const { status, data: session } = useSession();

        const {state:{cart}, dispatch, setShowCart ,showCart,cartItems} = useContext(Store)


        const handleLogout=()=>{
                Cookies.remove("cart")
                dispatch({type:CART_EMPTY})
                signOut({callbackUrl:"/login"})
        }
        
  return (
    <div className='navbar-container'>
        <p className='logo'>
                <Link href={"/"}>
                        <span className='logoSpan'>
                                <Image src="/icon.jpg" alt="GLAM Logo"  width={80} height={80}/>
                                RUGGMOBILE
                        </span>
                </Link>
        </p>
      
              
        <div className="nav-btn-container">
                        {
                                status === 'loading' ? 
                                      (
                                        <button type='button'  onClick={()=>status!=="authenticated" ? router.push("/login"):alert(status)} className="user-icon">
                                                <span className='user-icon-text'>Loading...</span>
                                        </button>
                                        
                                      ) : session?.user ? 
                                      (
                                        <Menu as="div" className="user-icon-menu">
                                                <Menu.Button className="user-icon-menu-text user-icon">
                                                        <span className='user-icon-text'>{session.user.name.split(" ")[0]}</span>
                                                </Menu.Button>
                                                
                                                <Transition
                                                        as={Fragment}
                                                        enter= 'transition ease-out duration-200'
                                                        enterFrom= 'opacity-0 -translate-y-10'
                                                        enterTo= 'opacity-100 translate-y-0'
                                                        leave='transition ease-in duration-150'
                                                        leaveFrom='opacity-100 translate-y-0'
                                                        leaveTo='opacity-0 -translate-y-10'
                                                >
                                                        <Menu.Items className="user-icon-menu-items">
                                                                <DropdownLink href={"/profile"}>        
                                                                        <Menu.Item as={"div"} className="user-icon-menu-child">
                                                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z"/></svg>
                                                                                <span>Profile</span> 
                                                                        </Menu.Item> 
                                                                </DropdownLink>
                                                                <DropdownLink href={"/order_history"}>
                                                                        <Menu.Item as={"div"} className="user-icon-menu-child">
                                                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M5 11v1h8v-7h-10v-1c0-.552.448-1 1-1h10c.552 0 1 .448 1 1v2h4.667c1.117 0 1.6.576 1.936 1.107.594.94 1.536 2.432 2.109 3.378.188.312.288.67.288 1.035v4.48c0 1.089-.743 2-2 2h-1c0 1.656-1.344 3-3 3s-3-1.344-3-3h-4c0 1.656-1.344 3-3 3s-3-1.344-3-3h-1c-.552 0-1-.448-1-1v-6h-2v-2h7v2h-3zm3 5.8c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm10 0c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm-3-2.8h-10v2h.765c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h5.53c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h1.765v-4.575l-1.711-2.929c-.179-.307-.508-.496-.863-.496h-4.426v6zm1-5v3h5l-1.427-2.496c-.178-.312-.509-.504-.868-.504h-2.705zm-16-3h8v2h-8v-2z"/></svg>
                                                                                <span>Order History</span>
                                                                        </Menu.Item> 
                                                                </DropdownLink>
                                                                <hr />
                                                                <a href={"#"} onClick={()=>handleLogout()} >
                                                                        <Menu.Item as={"div"} className="user-icon-menu-child logout-link" >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 12.771h-3.091c-.542 0-.82-.188-1.055-.513l-1.244-1.674-2.029 2.199 1.008 1.562c.347.548.373.922.373 1.42v4.235h-1.962v-3.981c-.016-1.1-1.695-2.143-2.313-1.253l-1.176 1.659c-.261.372-.706.498-1.139.498h-3.372v-1.906l2.532-.001c.397 0 .741-.14.928-.586l1.126-2.75c.196-.41.46-.782.782-1.102l2.625-2.6-.741-.647c-.223-.195-.521-.277-.812-.227l-2.181.381-.342-1.599 2.992-.571c.561-.107 1.042.075 1.461.462l2.882 2.66c.456.414.924 1.136 1.654 2.215.135.199.323.477.766.477h2.328v1.642zm-2.982-5.042c1.02-.195 1.688-1.182 1.493-2.201-.172-.901-.96-1.528-1.845-1.528-1.186 0-2.07 1.078-1.85 2.234.196 1.021 1.181 1.69 2.202 1.495zm4.982-5.729v15l6 5v-20h-6z"/></svg>
                                                                                <span>Logout</span>
                                                                        </Menu.Item> 
                                                                </a>
                                                        </Menu.Items>
                                        </Transition>
                                        </Menu>
                                                
                                      ) : 
                                      ( <button type='button'  onClick={()=>status!=="authenticated" ? router.push("/login"):alert(status)} className="user-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/></svg>                                        
                                        </button>)
                        }
                       


                <button type='button' className='cart-icon' onClick={()=>setShowCart(prev=>!prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 6v-2c0-2.209-1.791-4-4-4s-4 1.791-4 4v2h-5v18h18v-18h-5zm-7-2c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm10 18h-14v-14h3v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h3v14z"/></svg>
                        {
                                cart.cartItems.length > 0  && <span className="cart-item-qty">{cart.cartItems.reduce((a, c)=> a + c.qty , 0)}</span>
                        }
                </button>
        </div>
        {showCart?  <Cart /> : ""}
    </div>
  )
}

export default Navbar