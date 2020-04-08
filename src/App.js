import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import './App.css';

const HatsPage = () => {
  return (
    <div>
      <h1>Hats Page</h1>
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/store/hats" component={HatsPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
