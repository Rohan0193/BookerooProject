import React, { Component } from "react";

// a simple component to give some information 
class AboutPage extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col m-auto">
                        <h2 className="text-center">About Bookeroo</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col m-auto">
                        <h4 className="text-center">Bookeroo version 1.0.0</h4>
                        <h4 className="text-center">Copyright (c) 2021</h4>
                        <h4 className="text-center">Bookeroo Team</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutPage; 