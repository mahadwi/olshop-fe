import { useEffect, useContext } from 'react';
import { LoadingContext } from '../../../context/LoadingContext';
import Api from '../../../utils/Api'

export default function AuthGoogleIndex() {
    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        setLoading(true);
        Api.get(`/auth/callback${window.location.search}&provider=google`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                localStorage.setItem('apiToken', data.data.token)
                window.location.href = '/'
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
        </div>
    )
}
