import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddEmp from "./components/AddEmp";
import Emp from "./components/Emp";
import EmpList from "./components/EmpList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/emp" className="navbar-brand">
          Employee Management
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/emp"} className="nav-link">
              Employee List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Employee
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/emp"]} component={EmpList} />
          <Route exact path="/add" component={AddEmp} />
          <Route path="/emp/:id" component={Emp} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
