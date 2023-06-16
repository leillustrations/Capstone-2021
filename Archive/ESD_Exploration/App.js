import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, Login, Create_an_account } from "./component";
import background from "./Knowledge_Graph.png";

function App() {
  return (
    //<div className="App">
    <div className="App" style={{ backgroundImage: `url(${background})`, width: "100vw", height: "100vh"}}>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/Login" exact component={() => <Login />} />
          <Route path="/create_an_account" exact component={() => <Create_an_account />} />
        </Switch>

      </Router>
    </div>
  );
}

//Removed <Footer /> which was above </Router> and below </Switch>
export default App;