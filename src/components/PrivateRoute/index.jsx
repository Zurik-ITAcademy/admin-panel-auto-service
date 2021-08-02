import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Nav from '../Nav/Nav'

const PrivateRoute = ({ component:Component, ...rest}) => {
    const Auth = JSON.parse(localStorage.getItem('user'))

    return (
        <Route
            {...rest}
            render={props =>(
                Auth ? (
                    <>
                        <Nav />
                        <Component {...props} />
                    </>
                ) : <Redirect to='/login' />
            )}
         />
    )
}

export default PrivateRoute
