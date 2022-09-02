import React from "react";
import'../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./components/home.component";
import Login from "./components/login.component";
import Nav from "./components/nav.component";
import Register from "./components/register.component";
import{BrowserRouter,Routes,Route} from "react-router-dom";
function App() {
    return(
        <BrowserRouter>
    <div className="App">
    <Nav />
    
            <div className="auth-wrapper">
            <div className="auth-inner">
            
            <main className="form-signin">
                <Routes>
                <Route path='/' element={<Home /> }/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register/>}/>
 
                </Routes>
                </main>

                <Home/>
            </div>
        </div>
    </div>
    </BrowserRouter>
    );
}
export default App;