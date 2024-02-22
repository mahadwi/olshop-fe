import { createContext, useState } from "react";

export const ModalAddressContext = createContext()

const ModalAddressContextProvider = ({ children }) => {
    const [showModalAddress, setShowModalAddress] = useState(false)

    return (
        <ModalAddressContext.Provider value={{ showModalAddress, setShowModalAddress }}>
            {children}
        </ModalAddressContext.Provider>
    )
}

export default ModalAddressContextProvider
