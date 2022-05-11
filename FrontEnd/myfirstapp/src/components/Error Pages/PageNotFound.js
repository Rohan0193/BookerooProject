import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class PageNotFound extends Component {
    render() {
        return (
            <div>
                <div className="row">
                   <div className="img404 my-4">
                        <img src={require('./404errorbookimage.png')} alt="error message"></img>
                    </div> 
                </div>
                <div className="row">
                <span>&nbsp;&nbsp;</span>
                <span>&nbsp;&nbsp;</span>
                <span>&nbsp;&nbsp;</span>
                <span>&nbsp;&nbsp;</span>
                <span>&nbsp;&nbsp;</span>
                </div>
                <div className="row my-5">
                    <div className="col messagespacing401">
                      <h1 className="text-center">404: OOPS PAGE NOT FOUND</h1>  
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
