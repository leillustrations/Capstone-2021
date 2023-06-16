import React, {useEffect, useRef} from "react";
import "./custom.css";
import { Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom"
import './Home.css'

import './KGPage.jsx'
import * as d3 from 'd3';
import { Graph } from "react-d3-graph";
import ForceGraph2D from "react-force-graph-2d";
import axios from 'axios'


var nodesArr = require("../KG_Data/nodes.js")
var edgesArr = require("../KG_Data/edges1.js")

const dataset1 = {
  nodes: nodesArr ,
  links: edgesArr
};

function get_width(){
  var w=window.innerWidth
  if (w>400){return w*1}
  else {return w*1.5}
  
}
function get_height(){
  var w=window.innerWidth
  if (w>400){return window.innerHeight*1.5}
  else {return window.innerHeight*1}
  
}

function get_strength(){
  var w=window.innerWidth
  if (w>400){return -200}
  else {return 10}
}


function Home(props) {
  const forceRef = useRef(null);
  useEffect(() => {
      forceRef.current.d3Force("charge").strength(get_strength());
    });
  
  return (
<div>
<div className="HomeKG">
<div className="KGPage" >
      <ForceGraph2D
      graphData={dataset1}
      backgroundColor = "white"
      linkColor = "grey"
      nodeRelSize = {4}
      nodeVal = {5}
      z-index = {1}
      nodeLabel="id"
      nodeColor = {node => node.type === 'Precedents' ? 'orange' : 'grey'}
      linkCurvature="curvature"
      enablePointerInteraction={true}
      linkWidth={1.4}
      linkDirectionalArrowLength = {5}
      width={get_width()}
      height={get_height()}

      onNodeClick={(node) => {
            }}
      
      onNodeRightClick = {(node) => {
 }}
 
      ref={forceRef}
    />
    </div>
</div>
<div className="fade"></div>
<div className="heading">
    <div className="title"><br></br>Explore architecture <br></br> like never before.<br></br></div>
    <div>
      <p>Journey through the world of architecture. <br></br> One node at a time.</p>
      <div className="button">
        <a href="./KGPage"> Start Exploring Now </a>
      </div>
      
    </div>
  </div>
</div>
  );
}

export default Home;