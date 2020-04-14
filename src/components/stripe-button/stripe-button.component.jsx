import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {

  // stripe needs the price in cents
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_gwQZwl7FonTseTmnsIMq7LmA00Qw33GiOT';

  const onToken = token => {
    console.log(token);
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is: $${price}`}
      amound={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton