import React from 'react'
import {Link} from "react-router-dom";
import { bookMicroServiceApi } from '../../Utilities/hosts';

//button component to redirect user to create listing form
const GoToPaymentMethod = ()=> {
    return (
        <React.Fragment>
            <button className="go-to-transaction-button">
                    <Link style={{color:"#FFFFFF"}} className=" fas fa-shopping-cart nav-link" to={{
                        pathname:"/paymentmethod",
                        data: {bookMicroServiceApi}
                    }}
                    >
                    </Link>
            </button> 
        </React.Fragment>
    )
}

export default GoToPaymentMethod;