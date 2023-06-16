import React from "react";
import { Link, withRouter } from "react-router-dom";

const underline = {
  textDecorationLine: 'underline'
}

function Create_an_account() {

  const handleSubmit = event => {
    event.preventDefault();
    alert('You have submitted the form.')
  }

  return (
    <div className="Create_an_account">

      <div class="container">

        <div class="row align-items-center my-5">
          <div class="col-md-4"> </div>

          <div class="col-lg-5">
            <h1 class="font-weight-light">Sign Up</h1>
            <p> Already have an account? <Link to="/Login" style={underline}>Login</Link> </p>
            <form onSubmit={handleSubmit}>
              <label>Email:<input type="text" name="name"/></label>
              <label>Username:<input type="text" name="name" /></label>
              <label>Password:<input type="text" name="name" /></label>
              <p> I have read and understood the terms and conditions.</p>
              <input type="submit" value="Let's get started!" />
            </form>
          </div>

        </div>
        
      </div>

    </div>
  );
}

export default Create_an_account;