import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.compoment';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.css';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
