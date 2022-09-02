import React,{ Component } from "react";

export default class Home extends Component{
    render(){
        return(<form onSubmit={this.handleSubmit}>

            <h3>Login</h3>

            

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email"
                onChange={e=> this.email=e.target.value}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password"
                onChange={e=> this.password=e.target.value}/>
            </div>
            
        

            <button className="btn btn-primary btn-block">Login</button>

           </form>
            
        )
    }
}