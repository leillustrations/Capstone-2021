import React,{useEffect,useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, Login, Create_an_account_copy, ProjectInit, Split_view, SliderKG,KGPage, Projects, History, Settings,Download } from "./component";
import background from "./Knowledge_Graph.png";

function App() {
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/precedence').then(response=>response.json().then(data=>{setPost(data)}));
    }, []);

var arr = [];
for(var i in post)
    arr.push(post [i]);
  return (
    //<div className="App">
    <div className="App">
    {/* <div className="App" style={{ backgroundImage: `url(${background})`, width: "100vw", height: "100vh"}}> */}
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/Login" exact component={() => <Login />} />
          <Route path="/Create_an_account" exact component={() => <Create_an_account_copy />} />
          <Route path="/Fallingwater_House" exact component={() => <Split_view />} />
          <Route path="/KGPage" exact component={() => <KGPage />} />
          {arr.map(item=>( 
          <Route path={`/${item.precedence}`} 
          exact component={() => 
          <Split_view precedence={item.precedence} labels={item.label} paras={item.article}/>}/>))}

          {arr.map(item=>( 
          <Route path={`/${item.precedence}/Download`} 
          exact component={() => 
          <Download precedence={item.precedence}/>}/>))}

          <Route path="/KGPage/Projects" exact component={() => <Projects />} />
          <Route path="/KGPage/History" exact component={() => <History />} />
          <Route path="/KGPage/Settings" exact component={() => <Settings />} />
          <Route path="/ProjectInit" exact component={() => <ProjectInit />} />
        </Switch>

      </Router>
    </div>
  );
}

//Removed <Footer /> which was above </Router> and below </Switch>
//<Route path="/Fallingwater_House" exact component={() => <Split_view />} />
export default App;