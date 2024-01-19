import { createContext, useState, useEffect } from "react";
import Api from '../utils/Api'

export const CurrencyContext = createContext()

const CurrencyContextProvider = ({ children }) => {
    const [currency, setCurrency] = useState(localStorage.getItem('currency') ?? 'id')

    useEffect(() => {
        if (localStorage.getItem('currency') == null) {
            Api.get('/location').then((res) => {
                setCurrency(res.data.data.country_name == 'Indonesia' ? 'id' : 'en')
            }).catch((e) => {
                console.log(e)
            });
        }
    }, []);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export default CurrencyContextProvider
