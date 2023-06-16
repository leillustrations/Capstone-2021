import React from "react";
import "./custom.css";
import { Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

const styleObj1 = {
  fontSize: 20,
  color: "#000000",
  textAlign: "left",
  paddingTop: 2
}

const styleObj2 = {
  fontSize: 50,
  height:150,
  color: "#000000"
}

const wellStyles = { maxWidth: 4000, margin: 20 };

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
        
          <div class="col-lg-7">
            <h1 style={styleObj2} >Explore architecture like never before.</h1>

            <p style={styleObj1} >Journey through the world of architecture. One node at a time.</p>

            <Button style={styleObj1} variant="warning">Start Exploring Now </Button>{' '}

          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Home;