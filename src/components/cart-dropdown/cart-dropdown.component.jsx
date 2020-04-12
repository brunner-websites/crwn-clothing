import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component'

import './cart-dropdown.styles.scss';

// redux
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';


const CartDropdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">

        {
          cartItems ?
            cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)
            :
            null
        }

      </div>

      <CustomButton>Go to checkout</CustomButton>

    </div>
  )
}

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state)
})

export default connect(mapStateToProps)(CartDropdown);