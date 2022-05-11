import React from 'react'
import {Link} from "react-router-dom";

 function SigninButton() {

    return (
        <div>
            <button className="navbar-button-style">
                <Link style={{color:"#FFFFFF"}} className="nav-link" to="/login">
                    Sign In
                </Link>
            </button> 
        </div>
    )
}

export default SigninButton;