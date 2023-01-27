import React from 'react'
import LINK from "next/link"
import {  motion} from "framer-motion";
import { urlFor } from '../lib/client';

const Product = ({product:{_id,name,image,slug,price}}) => {
        let easing = [0.6, -0.05, 0.01, 0.99];
        const fadeInUp = {
                initial: {
                        y: 60,
                        opacity: 0,
                        transition: { duration: 0.6, ease: easing }
                },
                animate: {
                        y: 0,
                        opacity: 1,
                        transition: {
                                duration: 1,
                                ease: easing,
                                staggerChildren: 0.5 ,
                                delayChildren:.5
                        }
                }
        };

      

        
              
        
  return (
    <div>
        <LINK href={`/product/${slug.current}`}>
              <motion.div className ="product-card" variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} >
                        <motion.img whileInView={{opacity:[0,1 ],x:[60,0]}} transition={{duration:0.5}}   className='product-image' src={urlFor(image && image[0])} alt={`product ${name}`}  width="250px" height="250px"/>
                        <div className="product-name">{name}</div>
                        <div className="product-price">${price.toLocaleString()}</div>
              </motion.div>
        </LINK>
    </div>
  )
}

export default Product
