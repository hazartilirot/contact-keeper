import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Navbar from "./component/layout/Navbar";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import Alert from "./component/layout/Alert"
import PrivateRoute from "./component/routing/PrivateRoute";


import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";

import './App.css';

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  return (
      <AuthState>
        <ContactState>
          <AlertState>
            <BrowserRouter>
              <Fragment>
                <Navbar/>
                <div className="container">
                  <Alert />
                  <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                  </Switch>
                </div>
              </Fragment>
            </BrowserRouter>
          </AlertState>
        </ContactState>
      </AuthState>
  );
}
export default App;
