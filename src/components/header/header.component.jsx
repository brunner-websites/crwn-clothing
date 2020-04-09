import React from 'react'
import './header.styles.scss';
import { Link } from 'react-router-dom';

// code for importing SVG logo
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils'

const Header = ({ currentUser }) => {
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
      </div>
    </div >
  )
}

export default Header
