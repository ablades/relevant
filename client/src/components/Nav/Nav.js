import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Nav.css'
import { loadAuth } from '../../actions'


//Navigation for website
function Nav(props) {
    const {endpoint} = props
    
    const dispatch = useDispatch()
    // name of reducer (its where the state is stored)
    const name = useSelector(state => state.name)
    //Authentication request
    function onAuth () {
        dispatch(loadAuth(endpoint))
    } 
    return (
        <nav className="navbar">
            <div className="title">Relevant</div>

            <div className="appusername">
                {name !== "" ? 
                <span>u/{name}</span> 
                : 
                <button className="authButton" type="submit" onClick={onAuth}>
                    <div className="authText">
                        Authenticate with Reddit
                    </div>
                    <div className="authIcon">
                        <img className="authIcon" src={process.env.PUBLIC_URL + '/reddit-icon.svg'} alt="redditauth" />  
                    </div>
                </button>
                }
            </div>
        </nav>
    )
}

export default Nav