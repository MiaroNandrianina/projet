import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Maka ny panier efa voatahiry ao amin'ny navigateur (LocalStorage)
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("my_cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Tehirizina foana ao anaty LocalStorage rehefa miova ny panier
    useEffect(() => {
        localStorage.setItem("my_cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, qty) => {
        setCart(prev => {
            const exist = prev.find(item => item.id === product.id);
            if (exist) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, qte: item.qte + qty } : item
                );
            }
            return [...prev, { ...product, qte: qty }];
        });
    };

    const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));
    
    const clearCart = () => setCart([]);

    // Isan'ny entana rehetra ao anaty panier
    const cartCount = cart.reduce((acc, item) => acc + item.qte, 0);
    const totalPrice = cart.reduce((acc, item) => {
        const prix = parseFloat(item.prix) || 0;
        const qte = parseInt(item.qte) || 0;
        return acc + (prix * qte);
    }, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};