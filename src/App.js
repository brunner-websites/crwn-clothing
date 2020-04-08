import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.compoment';

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={Shop} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
