import React from 'react'
import {logout} from "../../actions/securityActions";

//logout component
function Logout() {
    return (
        <div>
            <button onClick={logout} className="navbar-button-logout">
                Logout
            </button>
        </div>
    )
}

export default Logout;