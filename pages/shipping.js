import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Breadcrumbs from '../components/Breadcrums'
import MotionWrap from '../components/MotionWrap'
import {
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/constants'
import { Store } from '../context/Store'

const Shipping = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setFocus,
  } = useForm()
  const router = useRouter()
  const {
    state: { cart, shippingAddress, paymentMethod },
    dispatch,
    showCart,
  } = useContext(Store)
  const { status, data: session } = useSession()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const submitHandler = async (
    { fullName, address, city, postcode, country, phone },
    e
  ) => {
    e.preventDefault()
    if (!selectedPaymentMethod) {
      return toast.error(`Please select a payment method`, {
        duration: 2000,
        style: { maxWidth: screen.width < 800 ? '80vw' : '40vw' },
      })
    }
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: selectedPaymentMethod })

    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: {
        fullName: fullName,
        phone: phone,
        address: address,
        city: city,
        postcode: postcode,
        country: country,
      },
    })

    toast.success(`Order details saved`, {
      duration: 3000,
      style: { maxWidth: screen.width < 800 ? '80vw' : '40vw' },
    })

    setTimeout(() => {
      router.push('/place_order')
    }, 800)
  }
  useEffect(() => {
    !shippingAddress.fullName
      ? setValue('fullName', session?.user?.name)
      : setValue('fullName', shippingAddress.fullName)
    !shippingAddress.phone
      ? setValue('phone', session?.user?.phone)
      : setValue('phone', shippingAddress.phone)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('postcode', shippingAddress.postcode)
    setValue('country', shippingAddress.country)
    setFocus('fullName')

    setSelectedPaymentMethod(paymentMethod || '')
  }, [setValue, shippingAddress, paymentMethod])

  return (
    <div>
      <Head>
        <title>Shipping | Ruggmobile</title>
      </Head>
      <Breadcrumbs activeStep={1} />
      <MotionWrap>
        <form onSubmit={handleSubmit(submitHandler)} className="shipping-form">
          <h1>About your order</h1>

          <div className="info-shipping">
            <div className="shipping-form-item">
              <div className="shipping-item-desc">
                <h2>Personal info</h2>
                <p>Provide your personal info</p>
              </div>

              <div className="shipping-form-inputs">
                <div className="shipping-form-input">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    autoFocus
                    style={{ textTransform: 'capitalize' }}
                    {...register('fullName', {
                      required: 'Please enter your full name. 😭',
                    })}
                  />
                  {errors.fullName ? (
                    <div className="loginErrors">{errors.fullName.message}</div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="shipping-form-input">
                  <label htmlFor="phone">Phone no</label>
                  <input
                    id="phone"
                    type="number"
                    autoFocus
                    {...register('phone', {
                      required: 'Can I get your number? 😉',
                      minLength: {
                        value: 9,
                        message: 'Your number should be longer. 😭',
                      },
                    })}
                  />
                  {errors.phone ? (
                    <div className="loginErrors">{errors.phone.message}</div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div className="shipping-form-item">
              <div className="shipping-item-desc">
                <h2>Shipping Adress</h2>
                <p>Provide us with your address please</p>
              </div>

              <div className="shipping-form-inputs">
                <div className="shipping-form-input">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    autoFocus
                    style={{ textTransform: 'capitalize' }}
                    {...register('address', {
                      required: "You've gotta have an address right? 😭",
                      minLength: {
                        value: 3,
                        message: 'It should be longer right? 😭',
                      },
                    })}
                  />
                  {errors.address ? (
                    <div className="loginErrors">{errors.address.message}</div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="shipping-form-input">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    autoFocus
                    style={{ textTransform: 'capitalize' }}
                    {...register('city', {
                      required: 'Represent your city! 😎',
                    })}
                  />
                  {errors.city ? (
                    <div className="loginErrors">{errors.city.message}</div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="shipping-form-input">
                  <label htmlFor="postcode">Post code</label>
                  <input
                    id="postcode"
                    type="text"
                    autoFocus
                    {...register('postcode')}
                  />
                </div>
                <div className="shipping-form-input">
                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    type="text"
                    autoFocus
                    style={{ textTransform: 'capitalize' }}
                    {...register('country', {
                      required: "You've got a country! 😎",
                    })}
                  />
                  {errors.country ? (
                    <div className="loginErrors">{errors.country.message}</div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div className="shipping-form-item">
              <div className="shipping-item-desc">
                <h2>Payment method</h2>
                <p>How will you like to pay</p>
              </div>
              <div className="shipping-form-inputs">
                <div className="radio-tile-group">
                  {[
                    { name: 'paystack', link: '/paystack_svg.svg' },
                    { name: 'stripe', link: '/stripe_svg.svg' },
                  ].map((payment, index) => (
                    <div className="input-container" key={index}>
                      <input
                        id={`${payment.name}`}
                        className="radio-button"
                        type="radio"
                        name="paymentMethod"
                        checked={selectedPaymentMethod === payment.name}
                        onChange={() => setSelectedPaymentMethod(payment.name)}
                      />
                      <div className="radio-tile">
                        <img
                          src={`${payment.link}`}
                          alt={`${payment.name} method`}
                          width="200px"
                          height="60px"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="shipping-btn-container">
            <button className="shipping-btn">
              <span>Continue</span>
              <svg
                style={{
                  fill: '#fff',
                  width: '24px',
                  height: '24px',
                  marginTop: '3px',
                }}
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                  fill-rule="nonzero"
                />
              </svg>
            </button>
          </div>
        </form>
      </MotionWrap>
    </div>
  )
}

Shipping.auth = true

export default Shipping
