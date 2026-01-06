import React, { createContext, useContext, useState } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, variant?: string, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product, variant?: string, quantity: number = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id && item.selectedVariant === variant);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id && item.selectedVariant === variant
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, selectedVariant: variant }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
