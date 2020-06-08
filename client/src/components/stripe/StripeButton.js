import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'


const StripeCheckoutButton =({price})=>{
    //stripe want the price value in cents 
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_vHKyPkMBK7MGyPWsLiSVIB8p00Wk1F7pQ3'

    const onToken= (token) =>{
        // console.log(token)
        // alert('Payment Successful!')
        axios({
            url: 'payment',
            method : 'post',
            data :{
                amount: priceForStripe,
                token
            }

        }).then(response => {
            alert('Payment Successful!')
        }).catch(error =>{
            console.log('Payment error: ', error)
            alert('There was an issue with your payment. Please make sure you use the provided credit card')
        })
    }

    return(
        <StripeCheckout 
            label='Pay Now'
            name=' CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            img='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay now'
            token={onToken}
            stripeKey={publishableKey}
            //token is the on-success callback that is triggered when we hit submit button

        />
    )

}

export default StripeCheckoutButton