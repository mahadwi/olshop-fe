import { useContext, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthUserContext } from '../context/AuthUserContext'
import { LoadingContext } from '../context/LoadingContext'

export default function AuthenticateMiddleware() {
    const { user } = useContext(AuthUserContext)
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        if (user === false) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [user])

    return (
        <>
            {
                user !== false ?
                    <>
                        {
                            user === null ?
                                <Navigate to={'/login'} />
                                :
                                <Outlet />
                        }
                    </> : <></>
            }
        </>
    )
}