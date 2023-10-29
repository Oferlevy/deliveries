import { MdOutlineComment } from 'react-icons/md';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

import CartItem from '@/components/CartItem';
import Modal from '@/components/Modal';

export default function Cart() {
    const { cart } = useCart();
    const [placeOrder, setPlaceOrder] = useState(false);

    return (
        <>
            <div className='flex flex-col bg-white p-4  h-[38rem] max-h-[85vh]'>
                <p className='text-2xl font-bold text-center'>ההזמנה שלי</p>

                <div className='flex flex-row-reverse items-center text-right w-full mt-4'>
                    <MdOutlineComment
                        size={22}
                        color='#8b5cf6'
                        className='ml-3'
                    />

                    <div className='flex flex-col'>
                        <p className='text-ms font-medium mb-[0.125rem]'>
                            הוסף הערות למנה
                        </p>
                        <span className='text-right text-xs text-gray-500'>
                            ...סכו״ם, רטבים, וכו
                        </span>
                    </div>
                </div>

                <div className='my-4 flex-1 overflow-auto divide-y pb-10'>
                    {cart.items.map((item, index) => (
                        <CartItem key={index} {...item} />
                    ))}
                </div>

                <div className='absolute inset-x-3 bottom-3'>
                    <button
                        onClick={() => setPlaceOrder(true)}
                        className='flex justify-between bg-[#8b5cf6] w-full
                 py-3 px-4 mt-2 rounded-md shadow-lg text-white transition'
                    >
                        <p className=''>{cart.price} ₪</p>
                        <p className='font-semibold'>הזמן</p>
                    </button>
                </div>
            </div>

            {/* <Modal isOpen={setPlaceOrder}>
                <PlaceOrder />
            </Modal> */}
        </>
    );
}
