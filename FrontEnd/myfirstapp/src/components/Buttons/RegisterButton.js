import React from 'react'
import {Link} from "react-router-dom";

 const RegisterButton = ()=> {
    return (
        <React.Fragment>
            <button className="navbar-button-style">
                    <Link style={{color:"#FFFFFF"}} className="nav-link" to="/register">
                        Sign Up
                    </Link>
            </button> 
        </React.Fragment>
    )
}

export default RegisterButton;