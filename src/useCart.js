import { useState } from 'react';

export default function useCart() {
    const [cart, setCart] = useState({
        items: [],
        price: 0,
    });

    const getItem = (id) => {
        const item = cart.items.find((item) => item.id === id);
        return item;
    };

    const addItem = (item) => {
        const newCart = cart;
        const index = cart.items.findIndex(
            (cartItem) => cartItem.id === item.id
        );

        if (index === -1) {
            newCart.items.push(item);
        } else {
            newCart.items[index].quantity = item.quantity;

            if (item.quantity === 0) {
                newCart.items.splice(index, 1);
            }
        }

        newCart.price = newCart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        setCart(newCart);
    };

    const setQuantity = (index, newQuantity) => {
        const newCart = cart;

        const previousQuantity = newCart.items[index].quantity;
        const price = newCart.items[index].price;

        newCart.price += (newQuantity - previousQuantity) * price;
        newCart.items[index].quantity = newQuantity;

        if (newQuantity === 0) {
            newCart.items.splice(index, 1);
        }

        setCart(newCart);
    };

    return { cart, getItem, addItem, setQuantity };
}
