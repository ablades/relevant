import Cookies from 'js-cookie'
// Username
export const LOAD_USERNAME = 'LOAD_USERNAME'
export const USERNAME_SUCCESS = 'USERNAME_SUCCESS'
export const USERNAME_ERROR = 'USERNAME_ERROR'

// Banners
export const LOAD_BANNERS = 'LOAD_BANNERS'
export const BANNERS_SUCCESS = 'BANNERS_SUCCESS'
export const BANNERS_ERROR = 'BANNERS_ERROR'

export const loadBannersSuccess = (data) => {
    return {
        type: BANNERS_SUCCESS,
        payload: {data}
    }
}

export const loadBannersError = (err) => {
    return {
        type: BANNERS_ERROR,
        payload: {err}
    }
}

export const loadBanners = (endpoint, username) => {
    return async(dispatch) => {
        // Build url
        const url = endpoint + "/banners/" + username
        // Send a request
        try {
            const response = await fetch(url)
            const json = await response.json()
            // Send to dispatcher
            dispatch(loadBannersSuccess(json))
        } catch(err) {
            dispatch(loadBannersError(err))
        }
    }
}

// Subreddits
export const LOAD_USERDATA = 'LOAD_USERDATA'
export const USERDATA_SUCCESS = 'USERDATA_SUCCESS'
export const USERDATA_ERROR = 'USERDATA_ERROR'
// Add a word
export const ADD_KEYWORD = 'ADD_KEYWORD'
export const KEYWORD_SUCCESS = 'KEYWORD_SUCCESS'
export const KEYWORD_ERROR = 'KEYWORD_ERROR'

export const addKeywordToSub = (endpoint, subreddit, username, keyword) => {
    return async(dispatch) => {

        // Build url
        const url = endpoint + `/user/${username}/${subreddit}/${keyword}`

        try {
            // Send a post request
            const response = await fetch(url)

            await dispatch(keywordSuccess(response.status))
            await dispatch(loadUserData(endpoint, username))

        } catch(err) {
            dispatch(keywordError(err))
    }
    }
}

// Retrieving username was successful
export const keywordSuccess = (success) => {
    return {
        type: KEYWORD_SUCCESS,
        payload: {success}
    }
}
// Retrieving username was unsuccessful
export const keywordError = (err) => {
    return {
        type: KEYWORD_ERROR,
        payload: {err}
    }
}

// Retrieving username was successful
export const usernameSuccess = (name) => {
    return {
        type: USERNAME_SUCCESS,
        payload: {name}
    }
}
// Retrieving username was unsuccessful
export const usernameError = (err) => {
    return {
        type: USERNAME_ERROR,
        payload: {err}
    }
}

// Get the current user from cookies
export const loadUsername = (endpoint) => {
    return async(dispatch) => {

        let search = window.location.search;
        let params = new URLSearchParams(search);
        let user = params.get('user');
        if (user) {
            Cookies.set("username", user)
        }

        const username = Cookies.get("username")
        // Send actions to dispatcher
        if(username){
            await dispatch(usernameSuccess(username))
            await dispatch(loadUserData(endpoint, username))
            await dispatch(loadBanners(endpoint, username))
        } else {
            dispatch(usernameError())
        }
    }
}

export const userDataSuccess = (data) => {
    return {
        type: USERDATA_SUCCESS,
        payload: {data}
    }
}

export const userDataError = (err) => {
    return {
        type: USERDATA_ERROR,
        payload: {err}
    }
}

//CONSIDER DOING ALL OF THE PARSING FOR SUBREDDITS HERE AND RETURNING THE ARRAY OF COMPONT
// Thunk - similar to a call back, function that wraps another function(action)
export const loadUserData = (endpoint, username) => {
    return async(dispatch) => {
        // Build url
        const url = endpoint + "/user/" + username
        // Send a request
        try {
            const response = await fetch(url)
            const json = await response.json()
            console.log(json)
            // Send to dispatcher
            dispatch(userDataSuccess(json))
            await dispatch(loadBanners(endpoint, username))
        } catch(err) {
            dispatch(userDataError(err))
        }
    }
}


// Authentication
export const LOAD_AUTH = 'LOAD_AUTH'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'


export const authSuccess = () => {
    return {
        type: AUTH_SUCCESS
    }
}

export const authError = (err) => {
    return {
        type: AUTH_ERROR,
        payload: {err}
    }
}

export const loadAuth = (endpoint) => {
    return async(dispatch) => {
        // Build url
        console.log("here")
        const url = endpoint + "/auth"
        // Send a request
        try {
            const response = await fetch(url, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            const json = await response.json()
            console.log(json)
            dispatch(authSuccess())
            window.location.assign(json["url"])
        } catch(err) {
            console.log(err)
            dispatch(authError(err))
        }
    }
}