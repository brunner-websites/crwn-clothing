import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.compoment';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.css';

import { auth } from './firebase/firebase.utils'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;


  componentDidMount() {

    this.unsubscribeFromAuth =
      auth.onAuthStateChanged((user) => {
        this.setState({
          currentUser: user
        })
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {

    const { currentUser } = this.state;
    return (
      <div>

        <BrowserRouter>
          <Header currentUser={currentUser} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/signin" component={SignInAndSignUpPage} />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
