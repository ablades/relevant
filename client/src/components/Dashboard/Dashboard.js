import React, { useEffect } from "react"
import Grid from '../Grid/Grid.js'
import Nav from '../Nav/Nav.js'
import { loadUsername } from "../../actions/index.js"
import { useDispatch } from 'react-redux'


function Dashboard(props) {
    const {endpoint} = props
    const dispatch = useDispatch() // Get the dispatcher

    // Attempt to load username on component mount
    useEffect(() => {
        dispatch(loadUsername(endpoint))
    })

    return (
        
        <div className="dashboard">
             <Nav
                endpoint={endpoint} 
            />

            <Grid
                endpoint={endpoint}
            />
        </div>
    )
}

export default Dashboard