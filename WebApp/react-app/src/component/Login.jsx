import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./Login.scss"
import axios from 'axios'

const underline = {
  textDecorationLine: 'underline'
}

function Login() {

  sessionStorage.setItem("user", " ")
  const [values, setValues] = useState({}); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {username, password} = values;
    const user = {username, password};
    await axios.post('http://localhost:5000/api/login/',user).then((response) => {
      console.log("LOgin",response.data.message);
      if (response.data.message) {
        sessionStorage.setItem("user", username)
        window.location.replace("http://localhost:3000/KGPage")
        //setState(true)
        //<Link to="/Fallingwater_House"></Link>

      }
      else {
        console.log("damn")
        window.alert("Wrong credentials");
      }

      return (response.data.message)
      
    }, (error) => {
      console.log(error);
    });
  };

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  return (
    
    <div className="base-container">
      
      <div className="header">Login</div>

      <div className="log-in-text">
        <p> Don't have an account? <br></br><Link to="/Create_an_account" style={underline}>Sign Up</Link></p>
      </div>

      <div className="content">

        <div className="form" onSubmit={handleSubmit}>
          
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

      </div>

      <div>
        <button type="submit" className="button" onClick={handleSubmit}>
          Login
        </button>
      </div>
      
    </div>
  );

}

export default Login;