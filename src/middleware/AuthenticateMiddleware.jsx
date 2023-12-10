import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthUserContext } from '../context/AuthUserContext'

export default function AuthenticateMiddleware() {
    const { user } = useContext(AuthUserContext)

    return (
        <>
            {
                user === null ?
                    <Navigate to={'/login'} />
                    :
                    <Outlet />
            }
        </>
    )
}