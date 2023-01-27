import { loadStripe } from '@stripe/stripe-js'

let stripePromise

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51MSlJ6Hs3winMsXJN3hxsTTwbrQndiqcTzLPvCumM17x25JsF7aoKMdOewpzBudJtP5pclcWKKPv8YeQqsAlPgoD00jlOcjNTA'
    )
  }

  return stripePromise
}

export default getStripe
