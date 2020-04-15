import React from 'react'
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

// styles
import './header.styles.scss';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles';

// code for importing SVG logo
import { ReactComponent as Logo } from '../../assets/crown.svg';

// firebase
import { auth } from '../../firebase/firebase.utils'

// Redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

const Header = ({ currentUser, cartHidden }) => {

  return (

    <HeaderContainer>
      <LogoContainer to="/" >
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>

        {
          currentUser ?
            <OptionDiv onClick={() => auth.signOut()}>
              Sign Out
            </OptionDiv>
            :
            <OptionLink to="/signin" >Sign-In</OptionLink>
        }

        <OptionLink to="/shop" >Shop</OptionLink>
        <OptionLink to="/contact" >Contact</OptionLink>

        <CartIcon />

      </OptionsContainer>

      {
        cartHidden ? null :
          <CartDropdown />
      }

    </HeaderContainer >
  )
}

const mapStateToProps = (state) => createStructuredSelector({
  currentUser: selectCurrentUser,
  cartHidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)