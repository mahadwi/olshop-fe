import { createContext, useState, useEffect } from "react";
import Api from '../utils/Api'

export const SiteSettingContext = createContext()

const SiteSettingContextProvider = ({ children }) => {
    const [siteSetting, setSiteSetting] = useState({})

    useEffect(() => {
        Api.get('/profile').then((res) => {
            setSiteSetting(res.data.data);
        }).catch((e) => {
            console.log(e)
        });
    }, []);

    return (
        <SiteSettingContext.Provider value={{ siteSetting, setSiteSetting }}>
            {children}
        </SiteSettingContext.Provider>
    )
}

export default SiteSettingContextProvider
