import React,{ useEffect, useState, useCallback, setState } from "react";
import { Link } from "react-router-dom";
import "./Create_an_account.scss";
import axios from 'axios'

const underline = {
  textDecorationLine: 'underline'
}

function Create_an_account_copy() {

  //const [getMessage, setGetMessage, setSendRequest, sendRequest] = useState(false)

  // require('react-dom');
  // window.React2 = require('react');
  // console.log(window.React1 === window.React2);

  //  useEffect(()=>{
  //   axios.get('http://localhost:5000/login/').then(response => {
  //     console.log("SUCCESS", response)
  //     console.log("SUCCESS", response.data.message)
  //     setGetMessage(response)
  //   }).catch(error=>{
  //     console.log(error)
  //   })
  // },[])

  const [values, setValues] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {email, username, password} = values;
    const user = {email, username, password};

    await axios.post('http://localhost:5000/api/create_an_account/',user).then((response) => {
      console.log("Login",response.data.status);
      if (response.data.status) {
        window.location.replace("http://localhost:3000/Login")
        window.alert("Account created, please proceed to login");
      }
      else {
        window.alert("This username is already taken.");
      }
      
    }, (error) => {
      console.log(error);
    });
  };

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  return (
    <div className="base-container">
      <div className="header">Sign Up</div>
        
        <div className="log-in-text"> 
          <p> Already have an account? <Link to="/Login" style={underline}>Login</Link> </p>
        </div> 

        <div className="content">        
          <div className="form">
            <div className="form-group">
              <label htmlFor="email"></label>
              <input 
                  onChange={handleChange('email')}
                  type="email" 
                  name="email" 
                  placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="username"></label>
              <input
                  onChange={handleChange('username')}
                  type="text" 
                  name="username" 
                  placeholder="Username" />
            </div>

            <div className="form-group">
              <label htmlFor="password"></label>
              <input 
                  onChange={handleChange('password')}
                  type="password" 
                  name="password" 
                  placeholder="Password" />
            </div>

          </div>

          <div className="log-in-text">
            <p> <input type="checkbox"/> I have read and understood the terms and conditions. </p>
          </div>
        </div>

      <div>
        <button type="submit" className="button" onClick={handleSubmit} to="/Login">
          Create Account
        </button>

      </div>

    </div>
  );

};
export default Create_an_account_copy;