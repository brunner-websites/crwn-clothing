import React from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

// redux 
import { connect } from 'react-redux';
import { toggleShowCart } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({ toggleShowCart, itemCount, ...otherProps }) => {
  return (
    <div className="cart-icon" {...otherProps} onClick={toggleShowCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount ? itemCount : '0'}</span>
    </div>
  )
}


const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state)
})


const mapDispatchToProps = dispatch => {
  return {
    toggleShowCart: () => dispatch(toggleShowCart())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);