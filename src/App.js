import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.compoment';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.css';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import { auth, createOrRetrieveUserProfileDocument } from './firebase/firebase.utils'


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
            <Route exact path="/shop" component={Shop} />
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
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})


const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
