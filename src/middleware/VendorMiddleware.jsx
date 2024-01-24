import { Outlet } from 'react-router-dom'

export default function AuthenticateMiddleware() {
    return (
        <>
            <Outlet />
        </>
    )
}
