import { MdOutlineComment } from 'react-icons/md';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';

import CartItem from '@/components/CartItem';

export default function Cart() {
    const { cart } = useCart();
    const [editMessage, setEditMessage] = useState(false);
    const [message, setMessage] = useState('');

    return (
        <div className='bg-white h-[38rem] max-h-[85vh]'>
            <div
                className={`absolute p-4 w-full h-full flex flex-col transition-all ${
                    editMessage
                        ? 'opacity-0 pointer-events-none -translate-x-10'
                        : ''
                }`}
            >
                <p className='text-xl font-bold text-center'>ההזמנה שלי</p>

                <div className='flex flex-row-reverse items-center text-right w-full mt-5'>
                    <MdOutlineComment
                        size={22}
                        color='#8b5cf6'
                        className='ml-3'
                    />

                    <div className='flex flex-col'>
                        <p className='text-ms font-medium mb-[0.125rem]'>
                            הוסף הערות למנה
                        </p>
                        <span
                            dir='rtl'
                            className='text-right text-xs text-gray-500'
                        >
                            {message || 'סכו״ם, רטבים, וכו...'}
                        </span>
                    </div>

                    <div className='flex-1' />
                    <button
                        onClick={() => setEditMessage(true)}
                        className='bg-[#8b5cf6] hover:bg-opacity-30 transition-colors bg-opacity-20 rounded px-4 py-2 text-ms text-[#8b5cf6]'
                    >
                        עריכה
                    </button>
                </div>

                <div className='my-4 flex-1 overflow-auto divide-y pb-10'>
                    {cart.items.map((item, index) => (
                        <CartItem key={index} {...item} />
                    ))}
                </div>

                <div className='absolute inset-x-3 bottom-3'>
                    <button
                        className='flex justify-between bg-[#8b5cf6] w-full
                        py-3 px-4 mt-2 rounded-md shadow-lg text-white transition'
                    >
                        <p className=''>{cart.price} ₪</p>
                        <p className='font-semibold'>הזמן</p>
                    </button>
                </div>
            </div>

            <div
                className={`absolute p-4 w-full h-full transition-all ${
                    editMessage
                        ? ''
                        : 'opacity-0 pointer-events-none translate-x-10'
                }`}
            >
                <button
                    onClick={() => setEditMessage(false)}
                    className='absolute bg-gray-200 hover:bg-gray-300 top-3 left-3 rounded-full p-1 transition-colors'
                >
                    <IoMdArrowBack size={28} />
                </button>

                <div className='flex flex-col'>
                    <p className='mt-11 text-lg font-medium self-end'>
                        הוסף הערות למנה
                    </p>

                    <div className='mt-3'>
                        <textarea
                            placeholder='סכו״ם, רטבים, וכו...'
                            rows={4}
                            dir='rtl'
                            onChange={(event) => setMessage(event.target.value)}
                            className='text-right w-full
                         p-2.5 resize-none outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 hover:ring-blue-500 hover:ring-1 hover:border-blue-500
                         focus:ring-blue-500 focus:ring-1 focus:border-blue-500 transition-all'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
