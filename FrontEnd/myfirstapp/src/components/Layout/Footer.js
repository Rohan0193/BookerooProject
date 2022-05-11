import React, { Component } from 'react'

//page footer
class Footer extends Component {
    
     //load the about page
     aboutPage = () =>{
        window.location.href='/about';
    }

    render() {
        return (
            <div>
                
                <button onClick={this.aboutPage} className="footer">
                    <h5>Learn more about us!</h5>
                </button>
            </div>
        )
    }
}

export default Footer;
           