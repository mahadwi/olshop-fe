import { createContext, useState } from "react";
import Api from "../utils/Api";

export const AuthUserContext = createContext()

const AuthUserContextProvider = ({ children }) => {

    const [user, setUser] = useState(false)

    const getUser = async () => {
        if (user === null) {
            return user;
        } else {
            const response = await Api.get('/user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                }
            })

            if (response) {
                setUser(response.data.data)
                return response.data.data
            } else {
                setUser(null)
                return null
            }
        }
    }

    const doLogin = (credentialsObject, errCallback, finnalyCallback) => {
        Api.post('/login', {
            email: credentialsObject.email,
            password: credentialsObject.password
        }).then((res) => {
            if (res) {
                localStorage.setItem('apiToken', res.data.data.token)
                window.location.href = '/'
            }
        }).catch((err) => {
            errCallback()
        }).finally(() => {
            finnalyCallback()
        })
    }

    const refreshUser = async () => {
        const response = await Api.get('/user', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        })

        if (response) {
            setUser(response.data.data)
            return response.data.data
        } else {
            setUser(null)
            return null
        }
    }

    return (
        <AuthUserContext.Provider value={{ getUser, doLogin, refreshUser, user }}>
            {children}
        </AuthUserContext.Provider>
    )
}

export default AuthUserContextProvider