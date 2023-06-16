import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container" >
          <Link class="navbar-brand" to="/" >
            Platform Name
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Login" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Login">
                  Login
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Create_an_account" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Create_an_account">
                  Create An Account
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);