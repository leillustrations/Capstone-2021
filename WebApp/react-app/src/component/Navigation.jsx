import React from "react";
import { Link, withRouter } from "react-router-dom";
import connect_arch from './CA_logo.jpg'

function Navigation(props) {

  var Inn = false
  if ((sessionStorage.getItem("user") != " ") & (sessionStorage.getItem("user") != null)){
    Inn = true
  }
  else {
    Inn = false
  }

  
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand-sm bg-light">
        <ul class="navbar">
          <Link to="/" >
            <img src={connect_arch} alt="" width="85" height="50" />
          </Link>

          <div class="test">
            <ul class="navbar2">
              
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link to="/">
                  Home
                  <span class="sr-only">      </span>
                  <span class="sr-only">      </span>
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Login" ? "active" : ""
                }`}
              >
                <Link to="/Login">
                  {Inn ? "Logout" : "Login"}
                  <span class="sr-only">      </span>
                  <span class="sr-only">      </span>
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Create_an_account" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Create_an_account">
                  Create An Account
                  <span class="sr-only">      </span>
                  <span class="sr-only">      </span>
                </Link>
              </li>

              {/* <p style={{ position: 'absolute', right: 200 }} > */}
              <p style={{ position: 'auto', right: 200 }} >
                  {Inn ? "You're logged in as: " : " "}
                  {sessionStorage.getItem("user")}
              </p>

            </ul>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);