import React, {useEffect, useState} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({component: Component, ...rest}) => {
    const auth = useSelector(state => state.auth)
    const [isAuth, setAuth] = useState(null)

    useEffect(()=> {
        const token = localStorage.getItem('token')
        console.log(token)
        if (token) {
            setAuth(true)
        }
        else {
            setAuth(false)
        }
    }, [auth]
    )

    if (isAuth === null){
        return <></>
    }

    return (
        <Route {...rest} render={props =>
        !isAuth ? (<Redirect to="/login"/>) : (<Component {...props}/>)
        }/>
    );
};
export default PrivateRoute;
