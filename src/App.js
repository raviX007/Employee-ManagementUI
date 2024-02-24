import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddOrd from "./components/AddOrd";
import Ord from "./components/Ord";
import OrdList from "./components/OrdList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/ord" className="navbar-brand">
          DBS_CRUD
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/ord"} className="nav-link">
              Ord_List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add_Ord
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/ord"]} component={OrdList} />
          <Route exact path="/add" component={AddOrd} />
          <Route path="/ord/:id" component={Ord} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
