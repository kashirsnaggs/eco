import React, { createContext, useContext, useReducer, useState } from 'react'
// import {toast} from "react-hot-toast"
import Cookies from 'js-cookie'

import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/constants'

export const Store = createContext()

const initialState = {
  // cart: { cartItems: [] },
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [] }, //check for cart in cookie parse it and put in state, else put sameold  cartItems arr
  shippingAddress: Cookies.get('shippingAddress')
    ? JSON.parse(Cookies.get('shippingAddress'))
    : {
        fullName: '',
        address: '',
        city: '',
        postcode: '',
        country: '',
        phone: '',
      }, //check for cart in cookie parse it and put in state, else put sameold  cartItems arr
  paymentMethod: Cookies.get('paymentMethod')
    ? JSON.parse(Cookies.get('paymentMethod'))
    : '', //check for cart in cookie parse it and put in state, else put sameold  cartItems arr
}

function reducer(state, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload
      const existItem = state.cart.cartItems.find(x => x._id === item._id)

      const cartItems = existItem
        ? state.cart.cartItems.map(x => (x.name === item.name ? item : x))
        : [...state.cart.cartItems, item]

      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))

      console.log(
        'Cookies',
        Cookies.get('cart')
          ? JSON.parse(Cookies.get('cart'))
          : { cartItems: [] }
      )

      return { ...state, cart: { ...state.cart, cartItems } }
    }

    case CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        x => x._id !== action.payload._id
      )

      Cookies.set(
        'cart',
        JSON.stringify({ ...state.cart, cartItems: cartItems })
      )
      return { ...state, cart: { cartItems: cartItems } }
    }
    case CART_SAVE_SHIPPING_ADDRESS:
      Cookies.set(
        'shippingAddress',
        JSON.stringify({ ...state.shippingAddress, ...action.payload })
      )
      return {
        ...state,
        shippingAddress: { ...state.shippingAddress, ...action.payload },
      }
    case CART_SAVE_PAYMENT_METHOD:
      Cookies.set('paymentMethod', JSON.stringify(action.payload))
      return { ...state, paymentMethod: action.payload }
    case CART_EMPTY:
      return { ...state, cart: { cartItems: [] } }
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [showCart, setShowCart] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch, setShowCart, showCart }

  return <Store.Provider value={value}>{children}</Store.Provider>
}
