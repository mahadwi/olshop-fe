import { createContext, useState } from "react";
import Api from "../utils/Api";

export const AuthUserContext = createContext()

const AuthUserContextProvider = ({ children }) => {

    const [user, setUser] = useState(false)

    const getUser = async () => {
        if (user === null) {
            return user;
        } else {
            try {
                const response = await Api.get('/user', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                    }
                })

                setUser(response.data.data)
                return response.data.data
            } catch (error) {
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
            errCallback(err)
        }).finally(() => {
            finnalyCallback()
        })
    }

    const refreshUser = async () => {
        try {
            const response = await Api.get('/user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                }
            })

            setUser(response.data.data)
            return response.data.data
        } catch (error) {
            setUser(null)
            return null
        }
    }

    const doLogout = (cb) => {
        setUser(null)
        localStorage.removeItem('apiToken')

        cb()
    }

    return (
        <AuthUserContext.Provider value={{ getUser, doLogin, refreshUser, user, doLogout }}>
            {children}
        </AuthUserContext.Provider>
    )
}

export default AuthUserContextProvider