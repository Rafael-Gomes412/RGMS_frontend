import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = (variant, product, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.variant.id === variant.id)
            if (existing) {
                return prev.map((item) =>
                    item.variant.id === variant.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prev, { variant, product, quantity }]
        })
    }

    const removeFromCart = (variantId) => {
        setCart((prev) => prev.filter((item) => item.variant.id !== variantId))
    }

    const updateQuantity = (variantId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(variantId)
            return
        }
        setCart((prev) =>
            prev.map((item) =>
                item.variant.id === variantId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => setCart([])

    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    )

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart,
            updateQuantity, clearCart, total, itemCount
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}