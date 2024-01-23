import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Api from '../utils/Api'

export default function AuthenticateMiddleware() {
    useEffect(() => {
    }, [])

    return (
        <>
            <Outlet />
        </>
    )
}
