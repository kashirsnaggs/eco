import React from 'react'
import { useRouter } from "next/router"

import { PaystackButton } from 'react-paystack';
// import { useStateContext } from '../context/StateContext';


const Paystack = ({totalPrice}) => {
        const route=useRouter()
        // const {setShowCart}=useStateContext()
        


        const paystackSuccessHandler = (paymentResult) => {
                console.log(paymentResult);
                // setShowCart(false)
                route.push("/success")
                // dispatch(payOrder(id,paymentResult))

              };

        const paystackOnCloseHandler = () => {
                // implementation for  whatever you want to do when the Paystack dialog closed.
                console.log('closed')
              }
            
        const paystackConfig = {
                reference: (new Date()).getTime().toString(),
                email: "ogooluwanick@gmail.com",
                publicKey: 'pk_test_938967b82e1bed29a14943b7cf1b10004bdd0e01',
                amount: (totalPrice.toFixed(0) *100),

        };
  return (
    <div>
                <PaystackButton   text= {
                                                                <div  className='paystackBtn'>
                                                                                <svg width="25" height="25" viewBox="0 0 29 28" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M1.51165 0H25.7369C26.5715 0 27.2504 0.671185 27.2504 1.50214V4.16909C27.2504 4.99651 26.5716 5.67141 25.7369 5.67141H1.51165C0.676996 5.67141 0 4.99657 0 4.16909V1.50214C0 0.671185 0.676996 0 1.51165 0ZM1.51165 14.887H25.7369C26.5715 14.887 27.2504 15.5599 27.2504 16.3874V19.058C27.2504 19.8854 26.5716 20.5566 25.7369 20.5566H1.51165C0.676996 20.5566 0 19.8854 0 19.058V16.3874C0 15.5599 0.676996 14.887 1.51165 14.887ZM15.1376 22.3304H1.51165C0.676996 22.3304 0 23.0016 0 23.8309V26.4997C0 27.3272 0.676996 28 1.51165 28H15.1377C15.9759 28 16.6511 27.3272 16.6511 26.4997V23.8309C16.6511 23.0016 15.9759 22.3304 15.1376 22.3304ZM1.51165 7.44171H27.2504C28.0868 7.44171 28.7619 8.11469 28.7619 8.94379V11.6127C28.7619 12.4401 28.0868 13.1148 27.2504 13.1148H1.51165C0.676996 13.1148 0 12.4401 0 11.6127V8.94379C0 8.11469 0.676996 7.44171 1.51165 7.44171Z" fill="#09A5DB"></path></svg>                                                                                
                                                                                <span>Paystack</span>    
                                                                </div>
                                                        } 
                                                        className='btn'
                                                        {...paystackConfig}
                                                        onSuccess={(reference)=>paystackSuccessHandler(reference)}   
                                                        onClose= {paystackOnCloseHandler} 
                                                        />
    </div>
  )
}

export default Paystack