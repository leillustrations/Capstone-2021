import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios'

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 1
      }}
  />
);

export var His = []

function Get_History() {
  axios.post('http://localhost:5000/api/get_history/', {User : sessionStorage.getItem("user")}).then((response) => {
    console.log(response.data.message);
    console.log(response.data.message[0]);


    for (var x in response.data.message) {
      console.log("x is: " + x)
      console.log("His.length is: " + His.length)
      var check = true
  
      if ((His.length != 0)) {
  
        //check if value is in the array
        for (var y in His) {
          if(response.data.message[x] == (His[y])["title"]) {
            check = false
            break;
          }
        }
        if (check) {
          His.push({title: response.data.message[x]})
        }
      }
      else {
        His.push({title: response.data.message[x]})
      }
    }

  });
}


function History() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleDelete = async (e) => {
    e.preventDefault();
    const u = sessionStorage.getItem("user")
    await axios.post('http://localhost:5000/api/delete_history/', {a : u}).then((response) => {
      sessionStorage.setItem("history", null)
    }, (error) => {
      console.log(error);
    });
  };

  return (
    
    <div value={{ color: '#fff' }}>
      {Get_History()}
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>

        <div className='navbar-toggle-projects'>
          <div className='back'>
            <Link to='/KGPage'>
              <p> {"<<back"} </p>
            </Link>

            <Link to='#' className='menu-bars' style={{flexDirection:'row',justifyContent : 'space-between'}}>
              <AiIcons.AiOutlineClose />
            </Link>
          </div>

          <div className="Projects">
            History
          </div>
        </div>

          <div className="space-project">
            <ColoredLine color="grey" />
          </div>
          

          {[{path: '/Fallingwater_House/Projects', cName: 'nav-text'}].map((item) => 
          {
            return (
              // <li className={item.cName}>
              <li className="add-new-project">
                <Link>
                  <span onClick={handleDelete}>{'Clear History'}</span>
                </Link>
              </li>
            );
          })}

        </ul>
      </nav>

        <div style={{textAlignVertical: "center",textAlign: "center"}}>
          <h1> History</h1>


          {His.map((item) => {
            return (
              <div className='nav' >
                <li>
                  <Link className="header">
                    <span> {item.title} </span>
                  </Link>
                </li>
                <br></br> 
              </div>
            );
          })}

        </div>
    </div>
  );
}

export default History;
