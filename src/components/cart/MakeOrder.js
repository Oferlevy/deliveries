import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';

export default function MakeOrder({ isVisible, setCurrentView }) {
    const { cart } = useCart();

    return (
        <div
            className={`absolute p-4 w-full h-full flex flex-col transition-all ${
                isVisible ? '' : 'opacity-0 pointer-events-none -translate-x-10'
            }`}
        >
            <button
                onClick={() => setCurrentView('content')}
                className='absolute bg-gray-200 hover:bg-gray-300 top-3 left-3 rounded-full p-1 transition-colors'
            >
                <IoMdArrowBack size={28} />
            </button>

            <div className='flex flex-col text-right'>
                <p className='mt-11 mb-4 text-lg font-medium self-end'>הזמן</p>

                <form action='/api/make-order' method='POST'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-medium mb-2'>
                            שם מלא
                        </label>
                        <input
                            name='name'
                            dir='rtl'
                            required={true}
                            placeholder='שם מלא'
                            className='border-b-2 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-medium mb-2'>
                            מספר טלפון
                        </label>
                        <input
                            name='phoneNumber'
                            type='tel'
                            dir='rtl'
                            required={true}
                            placeholder='מספר טלפון'
                            className='border-b-2 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline'
                        />
                    </div>

                    <input
                        type='hidden'
                        name='cart'
                        value={JSON.stringify(cart)}
                    />

                    <div className='absolute inset-x-3 bottom-3'>
                        <button
                            type='submit'
                            className='flex justify-between bg-[#8b5cf6] w-full
                        py-3 px-4 mt-2 rounded-md shadow-lg text-white transition'
                        >
                            <p>{cart.price} ₪</p>
                            <p className='font-semibold'>אישור</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
