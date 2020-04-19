import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.compoment';
import Checkout from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component';


// Redux
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

class App extends Component {

  unsubscribeFromAuth = null;


  componentDidMount() {

    const { checkUserSession } = this.props;

    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {

    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>

            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={Shop} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/signin" render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />} />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}

// this function when passed into the connect method will receive the 'state'
// here we're destructing the 'user' property from within the 'state' property
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
})


const mapDispatchToProps = dispatch => {
  return {
    checkUserSession: () => dispatch(checkUserSession()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
