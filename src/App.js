import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Interns from "./components/interns.component";
import Login from "./components/login.component";
import Nav from "./components/nav.component";
import Register from "./components/register.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAllInterns } from "./services/interns";
import  Container from "@mui/material/Container";
function App() {
  
    return (
        <BrowserRouter>
            <div className="App">
                <Nav />

              
                <div >
                        
                            <Routes>
                                <Route exact path='/' element={<Interns />} />
                          
                            </Routes>
                        </div>

             
            </div>
        </BrowserRouter>
    );
}
export default App;