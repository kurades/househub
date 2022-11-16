import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken, getUser } from '../api/Common'

function PublicRoute({component: Component, ...rest}) {
    return (
        <Route 
        {...rest}
        render={props => {
            return !getUser() ? <Component {...props}/>
            : <Redirect to= {{ pathname:'/', state: { from: props.location}}}/>
        }}
        />
    )
}

export default PublicRoute
