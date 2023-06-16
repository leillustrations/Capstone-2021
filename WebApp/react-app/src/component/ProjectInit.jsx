import React,{ useEffect, useState, useCallback, setState } from "react";
import axios from 'axios'

const underline = {
  textDecorationLine: 'underline'
}

function ProjectInit() {

  const [values, setValues] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const u = sessionStorage.getItem("user")
    const {newproject} = values;
    const user = {newproject, u};
    

    await axios.post('http://localhost:5000/api/AddProject/',user);
    window.location.replace("http://localhost:3000/project_ini/Interest.html?Pname=New+Project")
  };

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  return (
    <div className="base-container">
      
      <div className="header">New Project</div>

      <div className="content">

        <div className="form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="newproject"></label>
            <input 
                onChange={handleChange('newproject')}
                type="text" 
                name="newproject" 
                placeholder="New Project" />
          </div>

        </div>

      </div>

      <div>
        <button type="submit" className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      
    </div>
  );
}

export default ProjectInit;