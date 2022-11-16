export const getUser = () => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
        return JSON.parse(userStr)
    }
    return null
}

export const getToken = () => {
    return localStorage .getItem('token')
}

export const setUserSession = (user) => {
    localStorage .setItem('user', JSON.stringify(user))
}

export const setTokenSession = (token) => {
    localStorage .setItem('token', token)
}

export const removeUserSession = () => {
    localStorage .removeItem('user')
    localStorage .removeItem('token')
}

export const BASE_URL = "https://rentapartment.herokuapp.com/api/" 
// export const BASE_URL = "http://127.0.0.1:8000/api/"

