import { createContext, useState } from "react";

export const LanguageContext = createContext()

const LanguageContextProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') ?? 'en')

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageContextProvider
