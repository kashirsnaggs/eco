import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai'
import { Meta } from '../components'
import Breadcrumbs from '../components/Breadcrums'
import CartItem from '../components/CartItem'
import MotionWrap from '../components/MotionWrap'
import { CART_EMPTY } from '../constants/constants'
import { Store } from '../context/Store'
import { getError } from '../lib/error'
import getStripe from '../lib/getStripe'
import { useStateContext } from '../context/StateContext'

const Place_order = () => {
  const router = useRouter()

  const {
    state: { cart, shippingAddress, paymentMethod },
    dispatch,
    showCart,
    setShowCart,
    cartItems,
  } = useContext(Store)
  const [loading, setLoading] = useState(false)

  const round2 = num => Math.round(num * 100 + Number.EPSILON) / 100

  const itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  ) // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 10000 ? 2000 : 4500
  const totalPrice = round2(itemsPrice + shippingPrice)

  const handleCheckout = async () => {
    const stripe = await getStripe()

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })

    if (response.statusCode === 500) return

    const data = await response.json()

    toast.loading('Redirecting...')

    stripe.redirectToCheckout({ sessionId: data.id })
  }

  useEffect(() => {
    if (!paymentMethod || !shippingAddress.address) {
      router.push('/shipping')
    }
  }, [paymentMethod, shippingAddress, router])

  return (
    <div>
      <Meta title={'Place order | RUGGMOBILE'} />
      <Breadcrumbs activeStep={2} />
      <MotionWrap>
        <div className="place-order-screen">
          <h1>Place your order</h1>

          {cart.cartItems.length === 0 ? (
            <div className="empty-cart">
              <AiOutlineShoppingCart size={150} />
              <h3>Your shopping bag is empty</h3>
              <Link href={'/'}>
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  className="btn"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="place-order-container">
              <div className="place-order-details ">
                <div className="place-order-card">
                  <h2>Personal info</h2>

                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <p style={{ textTransform: 'capitalize' }}>
                      {shippingAddress.fullName}
                    </p>
                    <p> {shippingAddress.phone}</p>
                  </div>

                  <hr />

                  <h2>Shipping Adress</h2>
                  <p style={{ textTransform: 'capitalize' }}>
                    {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postcode}, ${shippingAddress.country}`}
                  </p>
                  <hr />
                  <h2>Payment method</h2>

                  <div>
                    {paymentMethod === 'paystack' ? (
                      <img
                        src={`/paystack_svg.svg`}
                        style={{ marginLeft: '-00px' }}
                        alt={`paystack method`}
                        width="150px"
                        height="40px"
                      />
                    ) : (
                      <img
                        src={`/stripe_svg.svg`}
                        alt={`stripe method`}
                        width="150px"
                        height="40px"
                      />
                    )}
                  </div>

                  <div
                    id="order-links"
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Link href={'/shipping'}>Change</Link>
                  </div>
                </div>

                <div className="product-container place-order-card">
                  {cart.cartItems.length >= 1 &&
                    cart.cartItems.map(item => (
                      <CartItem item={item} key={item._id} />
                    ))}
                </div>
              </div>
              <div className="place-order-card place-order-summary">
                <h2>Order Summary</h2>
                <div>
                  <div className="order-numbers">
                    <p>Subtotal</p>
                    <p>${itemsPrice.toLocaleString()}</p>
                  </div>
                  {/* <div className='order-numbers'>
                                                                <p>Tax</p>
                                                                <p>₦50.64</p>
                                                        </div> */}
                  <div className="order-numbers">
                    <p>Shipping</p>
                    <p>${shippingPrice.toLocaleString()}</p>
                  </div>
                  <div className="order-numbers">
                    <p>Total</p>
                    <p>${totalPrice.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <button
                    disabled={loading}
                    className="stripe-button"
                    onClick={handleCheckout}
                  >
                    {loading ? 'Loading...' : 'Confirm Order'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </MotionWrap>
    </div>
  )
}

Place_order.auth = true

export default Place_order
