import { useState, useEffect } from 'react';
import getMenu from '@/api/menu';

import MenuModal from '@/components/menu/MenuModal';
import MenuSection from '@/components/menu/MenuSection';
import Cart from '@/components/cart/Cart';
import ItemDescription from '@/components/menu/ItemDescription';
import MenuLayout from '@/components/menu/MenuLayout';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { useBeforeunload } from 'react-beforeunload';

export default function ContextWrapper({ menu }) {
    return (
        <CartProvider>
            <MenuPage menu={menu} />
        </CartProvider>
    );
}

function MenuPage({ menu }) {
    const { cart, dispatch } = useCart();

    const [price, setPrice] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [itemToShow, setItemToShow] = useState(null);

    useBeforeunload(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    });

    useEffect(() => {
        const currentCart = JSON.parse(localStorage.getItem('cart'));

        if (currentCart) {
            dispatch({ type: 'setCart', cart: currentCart });
        }
    }, []);

    useEffect(() => {
        setPrice(cart.price);
    }, [cart]);

    return (
        <MenuLayout {...menu}>
            <div className='h-full flex-1'>
                <ul>
                    {menu.sections.map((section, index) => (
                        <li key={index}>
                            <MenuSection
                                {...section}
                                setItemToShow={setItemToShow}
                            />
                        </li>
                    ))}
                </ul>

                {cart.items.length > 1 && (
                    <div className='sticky mx-3 bottom-3 rounded-md overflow-hidden'>
                        <button
                            onClick={() => setShowCart(true)}
                            className='flex justify-between py-3 px-4 w-full bg-[#8b5cf6] text-white'
                        >
                            <p>{price.toFixed(2)} ₪</p>
                            <p className='font-semibold'>צפה בהזמנה</p>
                        </button>
                    </div>
                )}
            </div>

            <MenuModal isOpen={showCart} close={() => setShowCart(false)}>
                <Cart />
            </MenuModal>

            <MenuModal
                isOpen={itemToShow !== null}
                close={() => setItemToShow(null)}
            >
                <ItemDescription
                    {...itemToShow}
                    isOpen={itemToShow !== null}
                    close={() => setItemToShow(null)}
                />
            </MenuModal>
        </MenuLayout>
    );
}

export async function getStaticProps() {
    const menu = await getMenu();

    return {
        props: { menu },
    };
}
