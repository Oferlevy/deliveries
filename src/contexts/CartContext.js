import { createContext, useReducer, useContext } from 'react';

// state managment via context
const CartContext = createContext();

// sets the cart (used when data is saved in localStorage)
const setCart = (newCart, action) => {
    newCart = action.cart;
    console.log(action.cart);
};

// adds item to the cart
const addItem = (newCart, action) => {
    // finding the index of the item with the correspondong id
    const index = newCart.items.findIndex(
        (cartItem) => cartItem.id === action.item.id
    );

    // to avoid bugs - if 'addItem' from some reason called more than once
    if (index === -1) newCart.items.push(action.item);
};

// changes the quantity of an item in the cart
const setQuantity = (newCart, action) => {
    // finding the index of the item with the correspondong id
    const index = newCart.items.findIndex(
        (cartItem) => cartItem.id === action.id
    );

    // DEVELPOPMENT only
    if (index === -1) {
        return;
    }

    // updating the quantity of the item
    newCart.items[index].quantity = action.newQuantity;

    // removing from the cart if the new quantity is 0
    if (action.newQuantity === 0) {
        newCart.items.splice(index, 1);
    }
};

// the reducer of the cart
const cartReducer = (state, action) => {
    let newCart = { ...state };

    switch (action.type) {
        case 'setCart':
            newCart = action.cart;
            console.log(newCart);
            break;
        case 'addItem':
            addItem(newCart, action);
            break;
        case 'setQuantity':
            setQuantity(newCart, action);
            break;
        case 'setMessage':
            newCart.message = action.message;
            break;
        default:
            return state;
    }

    // calculate new price
    newCart.price = newCart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return newCart;
};

// the cart context provider
const CartProvider = ({ children }) => {
    // cart object: { items[], price, message }
    const [cart, dispatch] = useReducer(cartReducer, {
        items: [
            {
                name: 'משלוח',
                description: 'לא ניתן להסרה',
                price: 5,
                quantity: 1,
                minQuantity: 1,
                maxQuantity: 1,
                image: '/images/delivery.webp',
            },
        ],
        price: 5,
        message: '',
    });

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// a hook to check the context is used within the corresponding context provider
const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
};

export { CartProvider, useCart };
