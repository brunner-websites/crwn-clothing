import React from 'react'
import './header.styles.scss';
import { Link } from 'react-router-dom';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

// code for importing SVG logo
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils'

// Redux component
import { connect } from 'react-redux';
import { toggleShowCart } from '../../redux/cart/cart.actions';


const Header = ({ currentUser, cartHidden, toggleShowCart }) => {
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">

        {
          currentUser ?
            <div className="option" onClick={() => auth.signOut()}>Sign Out</div>
            :
            <Link to="/signin" className="option">Sign-In</Link>
        }

        <Link to="/shop" className="option">Shop</Link>
        <Link to="/contact" className="option">Contact</Link>
        <CartIcon onClick={toggleShowCart} />
      </div>
      {
        cartHidden ? null :
          <CartDropdown />
      }

    </div >
  )
}

const mapDispatchToProps = dispatch => {
  return {
    toggleShowCart: () => dispatch(toggleShowCart())
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    cartHidden: state.cart.hidden
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
