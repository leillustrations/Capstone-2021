import React from "react";
import { Link, withRouter } from "react-router-dom";

const underline = {
  textDecorationLine: 'underline'
}

function Login() {
  return (
    <div className="Login">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-md-4">

          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Login</h1>
            <p> Don't have an account? <Link to="/Create_an_account" style={underline}>Sign Up</Link></p>
            <form>
              <label>Username:<input type="text" name="name" /></label>
              <label>Password:<input type="text" name="name" /></label>
              <p> Forgot Password?</p>
              <input type="submit" value="Let's get started!" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;