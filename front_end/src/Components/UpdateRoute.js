import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken, getUser } from '../api/Common'

function UpdateRoute({component: Component, ...rest}) {
    return (
        <Route 
        {...rest}
        render={props => {
            return getUser().phone ? <Component {...props}/>
            : <Redirect to= {{ pathname:'/profile/user', state: { from: props.location}}}/>
        }}
        />
    )
}

export default UpdateRoute
