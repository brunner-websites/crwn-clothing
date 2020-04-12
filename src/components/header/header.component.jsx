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
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

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
        <CartIcon />
      </div>
      {
        cartHidden ? null :
          <CartDropdown />
      }

    </div >
  )
}


const mapStateToProps = (state) => createStructuredSelector({
  currentUser: selectCurrentUser,
  cartHidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)
