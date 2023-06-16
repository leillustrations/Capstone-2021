import React, {useEffect, useRef, useState, userLayoutEffect} from "react"
import "./Split_view.css"
import Slideshow from "./Slideshow"
import * as d3 from 'd3';
import { Graph } from "react-d3-graph";
import ForceGraph2D from "react-force-graph-2d";
import axios from 'axios'
import { Link } from "react-router-dom";
import "./kgstyle.css"
import Navbar from "./SliderKG"

// import DOMPurify from 'dompurify';
// import $ from 'jquery';
// import data from "../KG_Data/data.json"
// import nodesArr from "../KG_Data/nodes.js"
// import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';
// import {Helmet} from "react-helmet";


// function KGPage(){
//   const nodeHoverTooltip = React.useCallback((node) => {
//     return `<div>${node.name}</div>`;
//   }, []);


//   return (
//     <div className="KGPage">
//       <header className="App-header">
//         Force Graph Example
//       </header>
//       <section className="Main">
//         <ForceGraph linksData={data.links} nodesData={data.nodes} nodeHoverTooltip={nodeHoverTooltip} />
//       </section>
//     </div>
//   );
// }

// export default KGPage


var nodesArr = require("../KG_Data/nodes.js") // Currently using nodes.js and edges1.js for frontend because csv files have many typos which are fixed in this js file, extra work to convert to csv
var edgesArr = require("../KG_Data/edges1.js")
// graph payload (with minimalist structure)
const dataset = {
  nodes: nodesArr ,
  links: edgesArr
};


var recommendations = ["Hunter Point Library","Capitol Complex","Phillips Exeter Academy Library"]
const list={
  "Ark Nova":importAll(require.context(`./imgs/Ark Nova`, false)),
  "Baker House":importAll(require.context(`./imgs/Baker House`, false)),
  "Bilbao Guggenheim Museum":importAll(require.context(`./imgs/Bilbao Guggenheim Museum`, false)),
  "Biomuseo":importAll(require.context(`./imgs/Biomuseo`, false)),
  "Capitol Complex":importAll(require.context(`./imgs/Capitol Complex`, false)),
  "Castelvecchio Museum":importAll(require.context(`./imgs/Castelvecchio Museum`, false)),
  "Chapel on Mt. Rokko":importAll(require.context(`./imgs/Chapel on Mt. Rokko`, false)),
  "Chee Tong Temple":importAll(require.context(`./imgs/Chee Tong Temple`, false)),
  "Darwin D. Martin House and Estate":importAll(require.context(`./imgs/Darwin D. Martin House and Estate`, false)),
  "Denver Airport":importAll(require.context(`./imgs/Denver Airport`, false)),
  "Falling Water":importAll(require.context(`./imgs/Falling Water`, false)),
  "Freitag Tower":importAll(require.context(`./imgs/Freitag Tower`, false)),
  "Friedman House":importAll(require.context(`./imgs/Friedman House`, false)),
  "Gamble House":importAll(require.context(`./imgs/Gamble House`, false)),
  "Heydar Aliyev Centre":importAll(require.context(`./imgs/Heydar Aliyev Centre`, false)),
  "Hotel de Beauvais":importAll(require.context(`./imgs/Hotel de Beauvais`, false)),
  "Hunter Point Library":importAll(require.context(`./imgs/Hunter Point Library`, false)),
  "Investcorp Building":importAll(require.context(`./imgs/Investcorp Building`, false)),
  "Jewel Changi Airport":importAll(require.context(`./imgs/Jewel Changi Airport`, false)),
  "Katsura Imperial Villa":importAll(require.context(`./imgs/Katsura Imperial Villa`, false)),
  "Kaufmann House":importAll(require.context(`./imgs/Kaufmann House`, false)),
  "Koshino House":importAll(require.context(`./imgs/Koshino House`, false)),
  "LEGO House":importAll(require.context(`./imgs/LEGO House`, false)),
  "Library of Mount Angel":importAll(require.context(`./imgs/Library of Mount Angel`, false)),
  "Maison des Fondateurs":importAll(require.context(`./imgs/Maison des Fondateurs`, false)),
  "Marika-Alderton House":importAll(require.context(`./imgs/Marika-Alderton House`, false)),
  "Marques de Riscal Hotel":importAll(require.context(`./imgs/Marques de Riscal Hotel`, false)),
  "Monticello":importAll(require.context(`./imgs/Monticello`, false)),
  "Montreal Biosphere":importAll(require.context(`./imgs/Montreal Biosphere`, false)),
  "MoPOP":importAll(require.context(`./imgs/MoPOP`, false)),
  "Munich Olympic Stadium":importAll(require.context(`./imgs/Munich Olympic Stadium`, false)),
  "National Aquatics Center Beijing":importAll(require.context(`./imgs/National Aquatics Center Beijing`, false)),
  "National Museum of Qatar":importAll(require.context(`./imgs/National Museum of Qatar`, false)),
  "New Museum":importAll(require.context(`./imgs/New Museum`, false)),
  "Palace of Assembly":importAll(require.context(`./imgs/Palace of Assembly`, false)),
  "Phillips Exeter Academy Library":importAll(require.context(`./imgs/Phillips Exeter Academy Library`, false)),
  "Philips Pavilion":importAll(require.context(`./imgs/Philips Pavilion`, false)),
  "Poly Grand Theatre":importAll(require.context(`./imgs/Poly Grand Theatre`, false)),
  "Punta Della Dogana":importAll(require.context(`./imgs/Punta Della Dogana`, false)),
  "Rietveld-Schroeder House":importAll(require.context(`./imgs/Rietveld-Schroeder House`, false)),
  "Sainsbury Center":importAll(require.context(`./imgs/Sainsbury Center`, false)),
  "Samuel Freeman House":importAll(require.context(`./imgs/Samuel Freeman House`, false)),
  "Säynätsalo Town Hall":importAll(require.context(`./imgs/Säynätsalo Town Hall`, false)),
  "Sharp Centre for Design":importAll(require.context(`./imgs/Sharp Centre for Design`, false)),
  "Sher-e bangla Nagar":importAll(require.context(`./imgs/Sher-e bangla Nagar`, false)),
  "Social Science Research Centre, Germany":importAll(require.context(`./imgs/Social Science Research Centre, Germany`, false)),
  "Starhill Gallery":importAll(require.context(`./imgs/Starhill Gallery`, false)),
  "Stockholm Public Library":importAll(require.context(`./imgs/Stockholm Public Library`, false)),
  "Swatch Headquarters":importAll(require.context(`./imgs/Swatch Headquarters`, false)),
  "T3":importAll(require.context(`./imgs/T3`, false)),
  "Tetris Hotel":importAll(require.context(`./imgs/Tetris Hotel`, false)),
  "The Centre Pompidou":importAll(require.context(`./imgs/The Centre Pompidou`, false)),
  "The Interlace":importAll(require.context(`./imgs/The Interlace`, false)),
  "The Millennium Dome":importAll(require.context(`./imgs/The Millennium Dome`, false)),
  "UFA Cinema":importAll(require.context(`./imgs/UFA Cinema`, false)),
  "UMass Design Building":importAll(require.context(`./imgs/UMass Design Building`, false)),
  "Unité d_Habitation":importAll(require.context(`./imgs/Unité d_Habitation`, false)),
  "V_A Spiral":importAll(require.context(`./imgs/V_A Spiral`, false)),
  "Venice Hospital, Le Corbusier":importAll(require.context(`./imgs/Venice Hospital, Le Corbusier`, false)),
  "Villa Savoye":importAll(require.context(`./imgs/Villa Savoye`, false)),
  "Villa Shodhan":importAll(require.context(`./imgs/Villa Shodhan`, false)),
  "Vitra Fire Station":importAll(require.context(`./imgs/Vitra Fire Station`, false)),
  "Vouksenniska Church":importAll(require.context(`./imgs/Vouksenniska Church`, false)),
  "W. A. Glasner House":importAll(require.context(`./imgs/W. A. Glasner House`, false)),
  "Walt Disney Concert Hall":importAll(require.context(`./imgs/Walt Disney Concert Hall`, false)),
  "Wingspread":importAll(require.context(`./imgs/Wingspread`, false))
}

function importAll(r) {
  return r.keys().map(r);
}

function findNeighbors(nodeid){
  // console.log(nodeid)
  // look for edges that i want
  var neighborList = []
  var edgesList = []

  var links = dataset.links
  
  for (let x in links){
    // console.log(links[x].source.id)
     if (links[x].source === nodeid){
      neighborList.push(links[x].target)
      edgesList.push(links[x])
    }
  }
  return [neighborList, edgesList]
}

function flatten(lst){
  var lst1 = lst.flat()
  var lst2 = [...new Set(lst1)]
  return lst2
}

function findNodes(nodeName){
  
  var nodesList = []
  for(let x in dataset.nodes){

    if (dataset.nodes[x].id === nodeName){

      nodesList.push(dataset.nodes[x])
    
  return nodesList
  }
}
}
function processDataset(recs){

  const neighborsList = flatten(recs.map(x => findNeighbors(x)[0]))
  // console.log(neighborsList)

  const nodeNames = neighborsList.concat(recommendations)
  // console.log(nodeNames)

  const edgesList = flatten(recs.map(x => findNeighbors(x)[1]))
  // console.log(edgesList)

  const nodesList = flatten(nodeNames.map(x => findNodes(x)))
  // console.log(nodesList)

  const dataset = {
    nodes: nodesList,
    links: edgesList
  }
  return dataset
}

const dataset1 = processDataset(recommendations)
// const dataset1 = dataset
// console.log(dataset)
// console.log(dataset1)

function search(name,dataset1){
  var found = dataset1.find(e => e.id === name);
  var res = found.id
  return res
}


function KGPage(props){
  const forceRef = useRef(null);
  useEffect(() => {
      forceRef.current.d3Force("charge").strength(-400);
    });


  // const onClickLink = function(source, target) {
  //   window.alert(`Clicked link between ${source} and ${target}`);
  // };


  return (
    <div >

      <div className="KGPage" >
        <Navbar/>
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
      width={props.kg_width}
      height={props.kg_height}

      onNodeClick={(node) => {

        if ((sessionStorage.getItem("user") != " ") & (sessionStorage.getItem("user") != null)){
          axios.post('http://localhost:5000/api/history/', {
            Precedent: {node}.node.id,
            User: sessionStorage.getItem("user")
          });
          //window.alert(`Clicked node ${node}`);
        }
        //window.alert(`Clicked node ${node}`);
        window.location.href=`/${node.id}`
            }}
      
      onNodeRightClick = {(node) => {
        
        axios.post('http://localhost:5000/api/recommendation/',{
          current_node: {node}.node.id ,
          view_distance: 3

        });

        if (({node}.node.id) == "Capitol Complex") {
          window.alert("Recommended Node: \nPhillips Exeter Academy Library\nHunter Point Library");
        }

        else if (({node}.node.id) == "Phillips Exeter Academy Library") {
          window.alert("Recommended Node: \nHunter Point Library\nCapitol Complex");
        }

        else if (({node}.node.id) == "Hunter Point Library") {
          window.alert("Recommended Node: \nPhillips Exeter Academy Library\nCapitol Complex");
        }


        //window.alert(`Recommended node: ${{node}.node.id}`);   //hererreeere
        forceRef.current.centerAt(node.x, node.y, 1000)
        forceRef.current.zoom(1.5, 1000)
      }}
      

      onNodeHover = {(node, prevNode) => {
        // var res = node.id
        var id = node ?node.id:"null"
        var x = node ?node.x:"0"
        var y = node ?node.y:"0"
        var type = node ?node.type:"none"
        var dis = type=="Precedents" ?"inherit":"none"
        // var
        // var x = node ?node.x:1
        // // window.alert(`Hovered node ${id}`);
        // window.alert(`Hovered node ${id} x ${x}`);

        // window.alert(``)
        document.getElementById("card").style.left = `${x+10+(document.documentElement.clientWidth/2)}px`;
        document.getElementById("card").style.top = `${y+10+document.documentElement.clientHeight/2}px`;
        document.getElementById("card").style.display = dis;
        document.getElementById("header").textContent = id;
        if (type=="Precedents"){

          var images = []
          for(var i in list[id])
            images.push(list[id][i].default)
          document.getElementById("image").src = images[0];}
        
      }
    }
      ref={forceRef}
    />

    {/* <Navbar/> */}

    </div>
      {/* <div id="cardOuter" className="cardOuter" > */}
         <div id="card" className="card" >
             <div id="header" className="header"></div>

             <img className="image" id="image" class="image"/>


          </div>
      </div>
    //  </div>
    
  );
}

export default KGPage



// //react-d3-graph library implementation
// function KGPage(){
//   var nodesArr = require("../KG_Data/nodes.js")
//   var edgesArr = require("../KG_Data/edges1.js")


// // graph payload (with minimalist structure)
//   const data = {
//     nodes: nodesArr ,
//     links: edgesArr
//   };
  
//   useEffect(() =>{

//   })

//   // const data = {
//   //   nodes: [{ id: "Hunter Point Library",'type': 'precedent'  }, { id: "Steven Holl Architects", 'type': 'architect' }, { id: "Concrete" }, { id: "Kaufmann House" }, {id: 'social spaces', type: "attributes"}],
//   //   links: [
//   //     { source: "Hunter Point Library", target: "Steven Holl Architects" },
//   //     { source: "Hunter Point Library", target: "Concrete" },
//   //     { source: "Kaufmann House", target: "Concrete" },
//   //     { source: "Hunter Point Library", target: "social spaces" }
//   //   ],
//   // };

//   // the graph configuration, just override the ones you need
//   const myConfig = {
//     nodeHighlightBehavior: true,
//     maxZoom : 8,
//     minZoom : 0.1,
//     focusZoom : 1,
//     panAndZoom: false,
//     width : 1900,
//     height : 3000,
//     directed : true,
//     highlightDegree: 1,
//     highlightOpacity: 0.2,
//     linkHighlightBehavior: true,
//     staticGraph: false,
//     collapsible: true,

//     d3: {
//       "alphaTarget": 0.05,
//       "gravity": -400,
//       "linkLength": 300,
//       "linkStrength": 1,
//       "disableLinkForce": false
//     },


//     node: {
//       color: "lightgreen",
//       size: 450,
//       highlightStrokeColor: "blue",
//       fontSize: 12,
//       "symbolType": "circle"


//     },
//     link: {
//       highlightColor: "lightblue",
//     },

//   };

//   const onClickNode = function(nodeId) {
//     window.alert(`Clicked node ${nodeId}`);
//   };

//   const onClickLink = function(source, target) {
//     window.alert(`Clicked link between ${source} and ${target}`);
//   };
//   var onZoomChange = (prevZoom, newZoom) => {
//     this.setState({ currentZoom: newZoom });
//     window.alert(`Graph is now zoomed at ${newZoom} from ${prevZoom}`);

//   };



//   return(
//     <div className="KGPage">
//        <Graph
//           id="graph-id" // id is mandatory
//           data={data}
//           config={myConfig}
//           onClickNode={onClickNode}
//           onClickLink={onClickLink}
//           onZoomChange={onZoomChange}
//           />
//     </div>
//   )
// }

// export default KGPage