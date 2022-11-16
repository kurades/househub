import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken, getUser } from '../api/Common'

function AdminRoute({component: Component, ...rest}) {
    return (
        <Route 
        {...rest}
        render={props => {
            return getUser() && getUser().type == "admin" ? <Component {...props}/>
            : <Redirect to= {{ pathname:'/', state: { from: props.location}}}/>
        }}
        />
    )
}

export default AdminRoute
