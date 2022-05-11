import React, {useEffect, useState} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import jwt_decode from "jwt-decode";

const AdminRoute = ({component: Component, ...rest}) => {
    const auth = useSelector(state => state.auth)
    const [isAuth, setAuth] = useState(null)

    useEffect(()=> {
        let token = localStorage.getItem("token")
        if (token) {
            let accountType = jwt_decode(localStorage.getItem("token"))["accountType"]
            
            if (accountType === "admin") {
                setAuth(true)
            }
            else {
                setAuth(false)
            }
        }
        else {
            setAuth(false)
        }
    }, [auth])

    if (isAuth === null){
        return <></>
    }

    return (
        <Route {...rest} render={props =>
        !isAuth ? (<Redirect to="/401"/>) : (<Component {...props}/>)
        }/>
    );
};
export default AdminRoute;
