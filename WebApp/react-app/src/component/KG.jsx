import React, {useState} from "react";
import {Form, Rating} from "semantic-ui-react";
import "./Split_view.css"
import Navbar from "./SliderKG"
import { Link } from "react-router-dom";
import { Slideshow } from ".";
import { format } from 'react-string-format';
import KGPage from "./KGPage";
import { Graph } from "react-d3-graph";
  
function KG() {
    const margin = 380
    return (
        
        <div className="KG_Viz">
        <div class="container">

            <Navbar />
            <KGPage kg_width={1520}/>
            
        </div>
        </div>

    );
}

export default KG;