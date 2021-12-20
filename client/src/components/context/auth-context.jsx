import React, {useState} from 'react'
import axios from "axios";
import jwt from "jsonwebtoken";
const AuthContext = React.createContext()

const AuthProvider = (props) => {
    const [user, setUser] = useState(null)
    const [isError, setIsError] = useState(false)
    const login = (username, password) => {
        setIsError(false)
        axios.post('/login',{
            username,
            password,
        }).then(result => {
            localStorage.setItem('token', result.data.token);
            const payload = jwt.decode(result.data.token);
            setUser({
                username: payload.username,
                roles: payload.roles,
                isAdmin: payload.isAdmin,
            })
        }).catch(() => setIsError(true))
        //TODO error handling -> pass isError -> handle render
    }
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null)
    }
    const decodeToken = (token) => {
        const payload = jwt.decode(token);
        setUser({
            username: payload.username,
            roles: payload.roles,
            isAdmin: payload.isAdmin,
        })
        console.log(payload);
    }
    return <AuthContext.Provider value={{user: user, login, logout, isError, decodeToken}} {...props}/>
}
const useAuth = () => {
    const context = React.useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth}