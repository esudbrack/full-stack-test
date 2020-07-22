import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from "react-router-dom";

// PAGES
import Login from "./pages/login";

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
