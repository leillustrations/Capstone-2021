// import React, {useEffect, useRef, useState, userLayoutEffect} from "react"
// import "./Split_view.css"
// import Navbar from "./SliderKG"
// import * as d3 from 'd3';
// import { select } from "d3";
// import { Graph } from "react-d3-graph";
// // import DOMPurify from 'dompurify';


// import $ from 'jquery';
// // import data from "../KG_Data/KG_Visualisation_Edges.csv"
// // import data from "../KG_Data/edges.csv"
// // import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';
// import {Helmet} from "react-helmet";
// // import { runForceGraph } from "./forceGraphGenerator";
// // import { import './kgstyle.css'
// import './kgstyle.css'

// import "./kg_helper"
// import CustomNode from "./CustomNode.jsx"



// // function KGPage(){
// //   const nodeHoverTooltip = React.useCallback((node) => {
// //     return `<div>${node.name}</div>`;
// //   }, []);


// //   return (
// //     <div className="KGPage">
// //       <header className="App-header">
// //         Force Graph Example
// //       </header>
// //       <section className="Main">
// //         <ForceGraph linksData={data.links} nodesData={data.nodes} nodeHoverTooltip={nodeHoverTooltip} />
// //       </section>
// //     </div>
// //   );
// // }

// // export default KGPage


// import ForceGraph2D from "react-force-graph-2d";
// // import $ from 'jquery';


// var nodesArr = require("../KG_Data/nodes.js")
// var edgesArr = require("../KG_Data/edges1.js")
// // graph payload (with minimalist structure)
// const data = {
//   nodes: nodesArr ,
//   links: edgesArr
// };



// function KGPage(){
//   const forceRef = useRef(null);
//   useEffect(() => {
//       forceRef.current.d3Force("charge").strength(-400);
//     });


//   // const onClickLink = function(source, target) {
//   //   window.alert(`Clicked link between ${source} and ${target}`);
//   // };



//   return (
//     <div className="KGPage">
//       <header className="App-header">
//         Force Graph Example
//       </header>

//       <ForceGraph2D
//       graphData={data}
//       backgroundColor ='#ffe6cc'
//       linkColor = '#ffcc66'
//       nodeRelSize = {4}
//       nodeVal = {5}
//       nodeLabel="id"
//       nodeAutoColorBy = 'type'
//       linkDirectionalArrowColor = '#ffcc99'
//       linkCurvature="curvature"
//       enablePointerInteraction={true}
//       linkWidth={1.4}
//       linkDirectionalArrowLength = {5}
//       onNodeClick={(node, event) => {
//         forceRef.current.centerAt(node.x, node.y, 1000)
//         forceRef.current.zoom(3, 1000)
//             }}
//       ref={forceRef}
//     />
//     </div>
//   );
// }

// export default KGPage



// // //react-d3-graph library implementation
// // function KGPage(){
// //   var nodesArr = require("../KG_Data/nodes.js")
// //   var edgesArr = require("../KG_Data/edges1.js")


// // // graph payload (with minimalist structure)
// //   const data = {
// //     nodes: nodesArr ,
// //     links: edgesArr
// //   };
  
// //   useEffect(() =>{

// //   })

// //   // const data = {
// //   //   nodes: [{ id: "Hunter Point Library",'type': 'precedent'  }, { id: "Steven Holl Architects", 'type': 'architect' }, { id: "Concrete" }, { id: "Kaufmann House" }, {id: 'social spaces', type: "attributes"}],
// //   //   links: [
// //   //     { source: "Hunter Point Library", target: "Steven Holl Architects" },
// //   //     { source: "Hunter Point Library", target: "Concrete" },
// //   //     { source: "Kaufmann House", target: "Concrete" },
// //   //     { source: "Hunter Point Library", target: "social spaces" }
// //   //   ],
// //   // };

// //   // the graph configuration, just override the ones you need
// //   const myConfig = {
// //     nodeHighlightBehavior: true,
// //     maxZoom : 8,
// //     minZoom : 0.1,
// //     focusZoom : 1,
// //     panAndZoom: false,
// //     width : 1900,
// //     height : 3000,
// //     directed : true,
// //     highlightDegree: 1,
// //     highlightOpacity: 0.2,
// //     linkHighlightBehavior: true,
// //     staticGraph: false,
// //     collapsible: true,

// //     d3: {
// //       "alphaTarget": 0.05,
// //       "gravity": -400,
// //       "linkLength": 300,
// //       "linkStrength": 1,
// //       "disableLinkForce": false
// //     },


// //     node: {
// //       color: "lightgreen",
// //       size: 450,
// //       highlightStrokeColor: "blue",
// //       fontSize: 12,
// //       "symbolType": "circle"


// //     },
// //     link: {
// //       highlightColor: "lightblue",
// //     },

// //   };

// //   const onClickNode = function(nodeId) {
// //     window.alert(`Clicked node ${nodeId}`);
// //   };

// //   const onClickLink = function(source, target) {
// //     window.alert(`Clicked link between ${source} and ${target}`);
// //   };
// //   var onZoomChange = (prevZoom, newZoom) => {
// //     this.setState({ currentZoom: newZoom });
// //     window.alert(`Graph is now zoomed at ${newZoom} from ${prevZoom}`);

// //   };



// //   return(
// //     <div className="KGPage">
// //        <Graph
// //           id="graph-id" // id is mandatory
// //           data={data}
// //           config={myConfig}
// //           onClickNode={onClickNode}
// //           onClickLink={onClickLink}
// //           onZoomChange={onZoomChange}
// //           />
// //     </div>
// //   )
// // }

// // export default KGPage