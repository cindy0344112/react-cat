import { jwtDecode } from "jwt-decode"

const JWT = 'store_token_id'

const setUserInfo = userInfo => {
    localStorage.setItem('LocalUserInfo', JSON.stringify(userInfo))
}

const getUserInfo = () => {    
    return localStorage.getItem('LocalUserInfo')
}

const setToken = token => {
    localStorage.setItem(JWT, token)
}

const getToken = token => {
    return localStorage.getItem(JWT)
}

const isLogin = () => {
    const jwToken = getToken();
    return !!jwToken;
}

const isTokenExpired = token => {
    try {
        const _info = jwtDecode(token);
        if(_info.exp < Date.now() / 1000) {
            return true;
        } else return false
    } catch(error) {

    }
}

const getUser = () => {
    const jwToken = getToken()
    console.log(jwToken)
    if(isLogin()) {
        const user = jwtDecode(jwToken)
        return user
    } else {
        return null
    }    
}

const logout = () => {
    localStorage.removeItem('LocalUserInfo')
}

global.auth = {
    setUserInfo,
    getUserInfo,
    setToken,
    getUser,
    logout
}