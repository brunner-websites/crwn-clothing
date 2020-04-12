import React from 'react';
import './checkout-item.styles.scss';

//redux
import { connect } from 'react-redux';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions'

const CheckoutItem = ({ cartItem, clearItemFromCart, addItem, removeItem }) => {

  const { id, name, imageUrl, price, quantity } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <span className="quantity-changer" onClick={() => removeItem(id)}>&#10094;</span>
        {quantity}
        <span className="quantity-changer" onClick={() => addItem(cartItem)}>&#10095;</span>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItemFromCart(id)}>&#10005;</div>
    </div >
  )
}

const mapDispatchToProps = dispatch => {
  return {
    clearItemFromCart: itemId => dispatch(clearItemFromCart(itemId)),
    addItem: item => dispatch(addItem(item)),
    removeItem: itemId => dispatch(removeItem(itemId))
  }
}


// const mapDispatchToProps = dispatch => {
//   return {
//     setCurrentUser: user => dispatch(setCurrentUser(user))
//   }
// }

export default connect(null, mapDispatchToProps)(CheckoutItem);