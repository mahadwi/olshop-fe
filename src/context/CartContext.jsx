import { createContext, useState } from "react";
import Api from "../utils/Api";

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    const [carts, setCarts] = useState([])

    const refreshCarts = () => {
        Api.get('/cart', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if (res) {
                setCarts(res.data.data)
            }
        })
    }

    return (
        <CartContext.Provider value={{ carts, refreshCarts, setCarts }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider