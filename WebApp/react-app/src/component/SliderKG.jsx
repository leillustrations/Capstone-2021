import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios'
import './sidebar.css'

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1
    }}
  />
);

// export const Bookmark = [
//   {
//     title: 'Fallingwater House',
//     path: '/',
//     cName: 'nav-text',
//     selected: true
//   },
//   {
//     title: 'Some other project',
//     path: '/',
//     cName: 'nav-text',
//     selected: false
//   },
// ];

export const SidebarData = [
  {
    title: 'Projects',
    path: '/KGPage/Projects',
    cName: 'nav-text',
    // subNav: [
    //   {
    //     title: "P1",
    //     itemId: "/about/projects",
    //   },
    //   {
    //     title: "P2",
    //     itemId: "/about/members",
    //   }
    // ]
  },
  {
    title: 'History',
    path: '/KGPage/History',
    cName: 'nav-text',
    linkto: "/History"
  },
  {
    title: 'Settings',
    path: '/KGPage/Settings',
    cName: 'nav-text',
    linkto: "/Settings"
  }
];

var pp = 0

export var Bookmark = []

function Get_project() {

  axios.post('http://localhost:5000/api/get_bookmarks/',
  {User: sessionStorage.getItem("user"), Project: sessionStorage.getItem("projects")}).then((response) => {
    //window.alert(response.data.message);
    //return (response.data.message)  
    pp = response.data.message
    console.log(pp)

    });
  
    if (pp == 0) {
      return (null)
    }

  for (var x in pp) {
    console.log("x is:" + x)
    var check = true

    if ((Bookmark.length != 0)) {

      //check if value is in the dictionaries
      for (var y in Bookmark) {

        if(pp[x] == (Bookmark[y])["title"]) {
          console.log("break")
          check = false
          break;
        }
      }
      console.log("here  here")
      // console.log(Bookmark[0])
      // console.log((Bookmark[0])["title"])
      // console.log(pp[x])
      // if (toString(pp[x]) in Bookmark.values()) {
      //   console.log("in")
      // }
      //Swatch%20Headquarters
      if (check) {
        console.log("entered push 1")
        Bookmark.push(  {
          title: pp[x],
          path: ('/' + pp[x]),
          cName: 'nav-text',
          selected: true
        })
      }

    }

    else {
      console.log(pp[x])
      console.log(Bookmark)
      console.log("entered push 2")
      Bookmark.push(  {
        title: pp[x],
        path: ('/' + pp[x]),
        cName: 'nav-text',
        selected: true
      })
    }
  }
  return (null)
}

function Navbar() {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [values, setValues] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {precedence} = values;
    const user = {precedence};

    await axios.post('http://localhost:5000/api/search/',user).then((response) => {
    window.alert("The search results are: " + response.data.message);
      
    });
  }

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  return(

    
    <div value={{ color: '#fff' }} >
              {Get_project()}

      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>

        <div className="form" style={{ position: 'absolute', right: 50 }} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username"></label>
            <input 
                onChange={handleChange('precedence')}
                type="text" 
                name="precedence"
            />
            <button type="submit" onClick={handleSubmit}>
            Search
            </button>
          </div>
        </div>


      </div>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>

        <div className='navbar-toggle'>
            <Link to='#' className='cross'>
              <AiIcons.AiOutlineClose />
            </Link>
            <br></br>
            <div className='top'> 
              {sessionStorage.getItem("projects")}
            </div>
        </div>

          {/* <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>

          <div style={{ fontWeight: "bold" }}>
            Cliff Architecture
            <ColoredLine color="red" />
          </div> */}

          {Bookmark.map((item, index) => {
            if (item.selected) {
              return (
                <li className={item.cName}>
                  <Link to={item.path}>
                    <div className="bookmark">
                      <BsIcons.BsBookmarkFill />
                    </div>
                    <span style={{ fontWeight: "bold" }}> {item.title} </span>
                  </Link>
                </li>
              );
            }
            else {
              return (
                <li className={item.cName}>
                  <Link to={item.path}>
                    <span> {item.title} </span>
                  </Link>
                </li>
              );
            }


          })}
          
          <div className="space"></div>
          <div>
          <ColoredLine color="grey" />
          </div>

          {SidebarData.map((item, index) => {
            return (

              <li key={index} className={item.cName}>

                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>

              </li>

            );

          })}

        </ul>

      </nav>
    </div>
  );
}

export default Navbar;