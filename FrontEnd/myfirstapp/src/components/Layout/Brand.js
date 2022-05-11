import React from 'react'
import {Link} from "react-router-dom";

//functional component to display brand name and refresh page
 const Brand = () => {
    return (
        <div>
            <React.Fragment>
                <Link className="navbar-brand" 
                     to="/">
                    Bookeroo
                </Link>
            </React.Fragment>
       
        </div>
    )
}

export default Brand;