import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Navbar from "./component/layout/Navbar";
import Home from "./component/pages/Home";
import About from "./component/pages/About";

import ContactState from "./context/contact/ContactState";
import './App.css';

const App = () => {
  return (
      <ContactState>
        <BrowserRouter>
          <Fragment>
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
              </Switch>
            </div>
          </Fragment>
        </BrowserRouter>
      </ContactState>
  );
}

export default App;
