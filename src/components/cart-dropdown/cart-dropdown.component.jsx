import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component'

import './cart-dropdown.styles.scss';

import { withRouter } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';

// actions
import { toggleShowCart } from '../../redux/cart/cart.actions'

const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">

        {
          cartItems.length ?
            cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)
            :
            <span className="empty-message">Your cart is empty</span>
        }

      </div>

      <CustomButton onClick={() => {
        history.push("/checkout");
        dispatch(toggleShowCart());
      }
      }>Go to checkout</CustomButton>

    </div>
  )
}

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state)
})

export default withRouter(connect(mapStateToProps)(CartDropdown));