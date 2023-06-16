import React, {useState} from "react";
import {Form, Rating} from "semantic-ui-react";
import "./Split_view.css"
import Navbar from "./SliderKG"
import { Link } from "react-router-dom";
import { Slideshow } from ".";
import { format } from 'react-string-format';
import KGPage from "./KGPage";
import { Graph } from "react-d3-graph";
import * as BsIcons from 'react-icons/bs';
import axios from 'axios'

const button_style1={borderRadius: 15,
    height: 30,
    backgroundColor: "#ebecf0",
    fontSize: 14,
    border: "0px solid",
    marginLeft:10
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
  
function Split_view(props) {
    const [rating, setRating] = useState(1);

    const [values, setValues] = useState(0);

    // const savebookmark = async (e) => {
    //     e.preventDefault();

    //     if (values==0){
    //         setValues(1)
    //         console.log("First" + values)
    //     }
    //     else{
    //         setValues(0)
    //         console.log("Second" + values)
    //     }

    //     const user = {precedence: "Fallingwater House", u: sessionStorage.getItem("user"), bk: values};
    //     await axios.post('http://localhost:5000/api/AddBookMark/',{precedence: "Fallingwater House", u: sessionStorage.getItem("user"), bk: values}).then((response) => {
    //     window.alert(response.data.message);
        
    //     });
    // }
    function get_width(){
        var w=window.innerWidth
        if (w>400){return w*0.5-10}
        else {return w}
        
    }
    function get_height(){
        var w=window.innerWidth
        if (w>400){return window.innerHeight}
        else {return window.innerHeight*0.5}
        
    }
    
    const path = format('/{0}/Download', props.precedence)
    return (
        
        <div className="split_view">
        <div class="container">
            <div class="parent">
            {/* <Navbar /> */}
            <div class="left" >
                <div >
                <KGPage kg_width={get_width()} kg_height={get_height()}/>
                </div>
            </div>
            
            <div class="right" >
                <div>
                    <Link to="/KGPage" >Close</Link>
                </div>
                
                <h1 style={{textAlign:"center", color:"#808080"}}>{props.precedence}
                    {/* <Link onClick={savebookmark} type="submit" aria-label={values? 1 : 0}>
                        {values ? <BsIcons.BsBookmarkFill /> : <BsIcons.BsBookmark />}
                    </Link> */}

                    <Link onClick={() => {

                            if (values==0){
                                setValues(1)
                                console.log("First" + values)
                            }
                            else{
                                setValues(0)
                                console.log("Second" + values)
                            }

                            axios.post('http://localhost:5000/api/AddBookMark/',{
                                Precedent: props.precedence, 
                                User: sessionStorage.getItem("user"),
                                Project: sessionStorage.getItem("projects"),
                                bk: values}).then((response) => {window.alert(response.data.message);});
                                // bk: values});
                        }
                    
                    
                    } type="submit" aria-label={values? 1 : 0}>
                        {values ? <BsIcons.BsBookmarkFill /> : <BsIcons.BsBookmark />}
                    </Link>
                </h1>

                <div style={{textAlign:"center"}}>
                    {props.labels.map(label=>(
                    <button class="mdc-button mdc-button--outlined" style={button_style1}>
                    <span class="mdc-button__ripple"></span>
                    <span class="mdc-button__label"  style={text_style1}>{label}</span>
                    </button>))}
                </div>
                
                <p>
                <hr style={{color: '#000000',backgroundColor: '#000000',height: 0.25, float:"center", marginLeft: 50, marginRight: 50}}/>
                </p>
                <p> 
                <Slideshow precedence={props.precedence}/>
                </p>
                
                
                {props.paras.map(para=>(
                    <p style={text_style2}>{para}</p>))}

                <Form style={{ textAlign: "center" }}>
                    <Form.Field>
                        <Rating
                            icon="star"
                            rating={rating}
                            maxRating={5}
                            onRate={(_, data) => {
                                setRating(data.rating);
                            }}
                        />
                    </Form.Field>
                </Form>

                </div>
             </div>
          </div>
      </div>
    );
}

export default Split_view;