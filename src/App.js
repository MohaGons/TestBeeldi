import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import './App.css';
import Routes from "./components/Routes/Routes";

function App() {
    
  return (
        <Router>
            <Switch>
                <Routes/>
            </Switch>
        </Router>    
  );
};

export default App;