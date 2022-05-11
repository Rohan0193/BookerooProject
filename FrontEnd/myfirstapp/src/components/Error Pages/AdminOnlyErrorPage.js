import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class AdminOnlyErrorPage extends Component {
    render() {
        return (
            <div>
            <div className="row">
               <div className="img404 my-4">
                    <img src={require('./401errorlockimg.jpg')} alt="error message"></img>
                </div> 
            </div>
            <div className="row">
            <span>&nbsp;&nbsp;</span>
            <span>&nbsp;&nbsp;</span>
            <span>&nbsp;&nbsp;</span>
            <span>&nbsp;&nbsp;</span>
            <span>&nbsp;&nbsp;</span>
            </div>
            <div className="row">
                <div className="col messagespacing401">
                  <h1 className="text-center">401: RESTRICTED ACCESS</h1> 
                  <h5 className="text-center my-5">Admin access only please return to home page</h5> 
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <Link to="/" className="btn btn-primary">Back to Home Page</Link>
                </div>
            </div>
        </div>
        )
    }
}
