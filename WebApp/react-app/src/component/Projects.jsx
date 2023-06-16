import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import * as BsIcons from 'react-icons/bs';
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

export var Pro = []

function Get_Project() {
  axios.post('http://localhost:5000/api/get_projects/', {User : sessionStorage.getItem("user")}).then((response) => {
    console.log(response.data.message[0]);
    console.log(response.data.message[1]);

    for (var x in response.data.message) {

      var check = true
  
      if ((Pro.length != 0)) {
  
        //check if value is in the dictionaries
        for (var y in Pro) {
          if(Object.keys(response.data.message[x])[0] == (Pro[y])["title"]) {
            check = false
            break;
          }
        }
        if (check) {
          Pro.push({title: Object.keys(response.data.message[x])[0], bookmark: Object.values(response.data.message[x])[0]})
        }
      }
      else {
        Pro.push({title: Object.keys(response.data.message[x])[0], bookmark: Object.values(response.data.message[x])[0]})
      }
    }

  });
}

function handleTry(x)  {
  //window.alert("Current Project have been changed to:" + x)
  //sessionStorage.setItem("projects", null)
  sessionStorage.removeItem("projects");
  sessionStorage.setItem("projects", x)
  //sessionStorage.removeItem("projects");
  //sessionStorage.clear();
}


function Projects() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [values, setValues] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {precedence} = values;
    sessionStorage.removeItem("projects");
    sessionStorage.setItem("projects", precedence)
    window.alert("Current project has been set to: " + precedence);

  }

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };


  return (

    <div value={{ color: '#fff' }}>
      {Get_Project()}
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>









          {/* <li className='navbar-toggle'>
            <Link to='/KGPage' className='menu-bars'>
              <p> {"<<back"} </p>
            </Link>

            <Link to='#' className='menu-bars' style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>

          <div style={{ fontWeight: "bold" }}>
            Projects
            <ColoredLine color="red" />
          </div> */}

          <div className='navbar-toggle-projects'>
            <div className='back'>
		          <Link to='/KGPage' >
              		<p> {"<<back"} </p>
            	</Link>

            	<Link to='#'>
              		<AiIcons.AiOutlineClose />
            	</Link>

            </div>

            <div className="Projects">
              Projects
            </div>

          </div>









          {[{ path: '/KGPage/Projects', cName: 'nav-text' }].map((item, index) => {
            return (
              <li key={index} className='add-new-project'>
                <Link to='/ProjectInit'>
                  <p> {'+ Add Project'} </p>
                </Link>
              </li>
            );
          })}

        </ul>
      </nav>


      <div style={{textAlignVertical: "center",textAlign: "center"}}>
          <h1> Projects</h1>

          <div className="form" style={{ position: 'absolute', right: 50 }} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username"></label>
              <input 
                  onChange={handleChange('precedence')}
                  type="text" 
                  name="precedence"
              />
              <button type="submit" onClick={handleSubmit}>
              Enter
              </button>
            </div>
          </div>

          
          {/* <Link to="/Fallingwater_House/History" onClick={handleSubmit}> Get Projects </Link> */}

          {/* {sessionStorage.getItem("projects")} */}
          
      
          {Pro.map((item) => {
            return (
              <div className='nav' >
                <div className="base-container">
                  <Link className="header">
                    <span onClick={handleTry(item.title)}> {item.title} </span>
                  </Link>

                  {(item.bookmark).map((item) => {
                    return (
                      <div className='nav' >
                        <span> <BsIcons.BsBookmarkFill />{item} </span>
                      </div>
                    );
                  })}

                </div>
                <br></br> 
              </div>
            );
          })}

        </div>
    </div>
  );
}

export default Projects;