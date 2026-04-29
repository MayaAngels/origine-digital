'use client';

import React from 'react';

const CartContext = React.createContext({
    cart: [] as any[],
    addToCart: (item: any) => {},
    removeFromCart: (id: string) => {},
    clearCart: () => {},
    total: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = React.useState<any[]>([]);
    
    const addToCart = (item: any) => setCart([...cart, item]);
    const removeFromCart = (id: string) => setCart(cart.filter(i => i.id !== id));
    const clearCart = () => setCart([]);
    const total = cart.reduce((sum, i) => sum + (i.price || 0), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return React.useContext(CartContext);
}