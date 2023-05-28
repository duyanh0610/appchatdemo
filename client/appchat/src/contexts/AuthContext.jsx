
import { createContext, useCallback, useEffect, useState } from 'react'
import { postRequest, baseUrl } from '../utils/Service'

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [registerInfo, setRegisterInfo] = useState({
        username: '',
        email: '',
        name: '',
        password: ''
    })
    const [registerError, setRegisterError]  = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)


    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })
    const [loginError, setLoginError]  = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false)

    
    useEffect(()=>{
        const user  = localStorage.getItem("User")
        setUser(JSON.parse(user))
    },[])
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [])
    const logoutUser = useCallback(()=>{
        localStorage.removeItem("User")
        setUser(null)
    })
    const loginUser =useCallback(async (e)=>{
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null)
        const response = await postRequest(`${baseUrl}/auth/signin`,JSON.stringify(loginInfo))
        setIsLoginLoading(false)
        if(response.error){
            return setLoginError(response)
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    },[loginInfo])

    const registerUser = useCallback(async (e) => {
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)
        const response = await postRequest(`${baseUrl}/auth/signup`, JSON.stringify(registerInfo))
        setIsRegisterLoading(false)
        if (response.error) {
            return setRegisterError(response)
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [registerInfo])
    return (<AuthContext.Provider
        value={{ 
            user,
            registerInfo,registerUser,registerError, isRegisterLoading, updateRegisterInfo,
            loginInfo,loginUser,loginError,isLoginLoading,updateLoginInfo,
             logoutUser }}>
       
       
        {children}
    </AuthContext.Provider>)
}

