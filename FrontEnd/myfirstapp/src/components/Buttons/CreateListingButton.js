import React from 'react'
import {Link} from "react-router-dom";

//button component to redirect user to create listing form
const CreateListingButton = ()=> {
    return (
        <React.Fragment>
            <button className="create-listing-button">
                    <Link style={{color:"#FFFFFF"}} className="nav-link" to="/listing">
                        Create Listing
                    </Link>
            </button> 
        </React.Fragment>
    )
}

export default CreateListingButton;