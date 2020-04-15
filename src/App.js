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
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import { auth, createOrRetrieveUserProfileDocument } from './firebase/firebase.utils'
// import { addCollectionAndDocuments } from './firebase/firebase.utils';


class App extends Component {

  unsubscribeFromAuth = null;


  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth =

      // when the AuthState changes e.g. when a user logs in
      auth.onAuthStateChanged(async userAuth => {

        // userAuth is an auth object from firebase
        if (userAuth) {
          const userRef = await createOrRetrieveUserProfileDocument(userAuth);
          userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          })
        } else {
          setCurrentUser(null);
          //setCurrentUser({userAuth})
        }

        //setCurrentUser({ userAuth });
      });


    // this code was only called 1 time to put the shop-collections into the firebase db
    //addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
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
    setCurrentUser: user => dispatch(setCurrentUser(user)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
