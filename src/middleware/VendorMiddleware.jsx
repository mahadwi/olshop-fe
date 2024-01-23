import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Api from '../utils/Api'

export default function AuthenticateMiddleware() {
    useEffect(() => {
        Api.get('/vendor', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {

        })
    }, [])

    return (
        <>
            <Outlet />
        </>
    )
}
