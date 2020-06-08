import React from 'react'
import './Checkout.scss'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectCartItems , selectCartTotal} from '../../redux/cart/CartSelector'
// import CartItem from '../../components/Cart-item/CartItem'
import CheckoutItem from '../../components/checkout-item/CheckoutItem'
import StripeCheckoutButton from '../../components/stripe/StripeButton'


const Checkout =({cartItems , total}) =>(
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>

        </div>
        {
            cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={ cartItem } /> 
            ))
        }
        <div className='total'>
            <span>TOTAL: ${total} </span>
        </div>
        <div>
            Test card details : 4242 4242 4242 4242
            <br></br>
            Expiry: 04/20
            <br></br>CVV: 123 
        </div>
        <StripeCheckoutButton price={total} />
    </div>
)

const mapStateToProps = createStructuredSelector ({
    cartItems : selectCartItems,
    total :selectCartTotal
})

export default connect(mapStateToProps) (Checkout)
