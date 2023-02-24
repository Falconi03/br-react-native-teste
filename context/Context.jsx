import React, { createContext, useState } from "react";

export const Context = createContext({})

export const ContextProvider = ({ children }) => {

    const [carrinho, setCarrinho] = useState({})
    const [user, setUser] = useState({})

    return (
        <Context.Provider value={
            {
                carrinho,
                setCarrinho,
                user,
                setUser,
            }
        }>
            {children}
        </Context.Provider>
    )
}