import { useState, useEffect } from 'react';
import { getMenu } from '@/api/menu';

import MenuModal from '@/components/MenuModal';
import MenuSection from '@/components/MenuSection';
import Cart from '@/components/Cart';
import ItemDescription from '@/components/ItemDescription';
import MenuLayout from '@/components/MenuLayout';
import { useCart } from '@/contexts/CartContext';
import Modal from '@/components/Modal';

export default function MenuPage({ menu }) {
    const { cart } = useCart();

    const [price, setPrice] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [itemToShow, setItemToShow] = useState(null);

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

                {price > 0 && (
                    <div className='fixed inset-x-3 bottom-3 rounded-md overflow-hidden'>
                        <button
                            onClick={() => setShowCart(true)}
                            className='flex justify-between py-3 px-4 w-full bg-[#8b5cf6] text-white'
                        >
                            <p>{price} ₪</p>
                            <p className='font-semibold'>צפה בהזמנה</p>
                        </button>
                    </div>
                )}
            </div>

            {/* <Modal isOpen={showCart} close={() => setShowCart(false)}>
                <Cart />
            </Modal>

            <Modal
                isOpen={itemToShow !== null}
                close={() => setItemToShow(null)}
            >
                <ItemDescription />
            </Modal> */}

            <MenuModal isOpen={showCart} close={() => setShowCart(false)}>
                <Cart />
            </MenuModal>

            <MenuModal
                isOpen={itemToShow !== null}
                close={() => setItemToShow(null)}
            >
                <ItemDescription
                    {...itemToShow}
                    close={() => setItemToShow(null)}
                    // setPrice={setPrice}
                />
            </MenuModal>
        </MenuLayout>
    );
}

export async function getStaticProps() {
    const menu = await getMenu();

    menu.sections[1].items = [
        menu.sections[1].items[0],
        menu.sections[1].items[1],
        menu.sections[1].items[0],
        menu.sections[1].items[0],
        menu.sections[1].items[0],
        menu.sections[1].items[0],
    ];

    return { props: { menu } };
}
