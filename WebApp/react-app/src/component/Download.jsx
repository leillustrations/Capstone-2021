import React, {useState} from "react";
import Fallingwater from './Fallingwater_House.jpg';
import "./Split_view.css"
import Navbar from "./SliderKG"
import { Link } from "react-router-dom";
import Collapsible from 'react-collapsible';
import { Button } from "react-bootstrap";
import { KGPage } from ".";
const button_style1={borderRadius: 15,
    height: 30,
    backgroundColor: "#ebecf0",
    fontSize: 14,
    border: "0px solid",
    marginLeft:50
}
const button_style2={borderRadius: 15,
    height: 30,
    backgroundColor: "#ebecf0",
    fontSize: 14,
    border: "0px solid",
    marginLeft:0
}
const text_style1={textAlign:"center", color:"#808080",marginLeft:-16, marginRight:0}

const text_style2={textAlign:"left", color:"#808080", marginLeft:50, marginRight:50}

function Download(props) {
    
    return (
        
    <div className="split_view">
        <div class="container">
            <div class="parent">
                <Navbar />
                <div class="left">
                <KGPage kg_width={700}/>
                </div>
            
                <div class="right" >
                    <div>
                        <Link to={`/${props.precedence}`} >Back</Link>
                    </div>
                    
                    <h1 style={{textAlign:"center", color:"#808080"}}>{props.precedence}</h1>

                    <hr style={{color: '#808080',backgroundColor: '#808080',height: 0.25, float:"center", marginLeft: 0, marginRight: 0}}/>
                        <Collapsible trigger={<Button style={{backgroundColor:"white"}}>Photos & Renders</Button>} >
                            <img src={Fallingwater} width="400px" />
                        </Collapsible>
                        <hr style={{color: '#808080',backgroundColor: '#808080',height: 0.25, float:"center", marginLeft: 0, marginRight: 0}}/>

                    
                        <Collapsible trigger={<Button style={{backgroundColor:"white"}}>Diagrams</Button>} >
                            <img src={Fallingwater} width="400px" />
                        </Collapsible>
                        <hr style={{color: '#808080',backgroundColor: '#808080',height: 0.25, float:"center", marginLeft: 0, marginRight: 0}}/>
                    
                        <Collapsible trigger={<Button style={{backgroundColor:"white"}}>Floor Plan</Button>} >
                            <img src={Fallingwater} width="400px" />
                        </Collapsible>
                    
                        <hr style={{color: '#808080',backgroundColor: '#808080',height: 0.25, float:"center", marginLeft: 0, marginRight: 0}}/>
                        <Collapsible trigger={<Button style={{backgroundColor:"white"}}>Section</Button>} >
                            <img src={Fallingwater} width="400px" />
                        </Collapsible>
                    
                        <hr style={{color: '#808080',backgroundColor: '#808080',height: 0.25, float:"center", marginLeft: 0, marginRight: 0}}/>
                        <Collapsible trigger={<Button style={{backgroundColor:"white"}}>Axonometric</Button>}>
                            <img src={Fallingwater} width="400px" />
                        </Collapsible>
                        <hr style={{color: '#808080',backgroundColor: '#808080',height: 0.25, float:"center", marginLeft: 0, marginRight: 0}}/>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Download;