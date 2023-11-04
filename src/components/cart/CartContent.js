import { MdOutlineComment } from 'react-icons/md';
import { useCart } from '@/contexts/CartContext';

import CartItem from '@/components/cart/CartItem';
import CartPaymentNumber from './CartPaymentNumber';

export default function CartContent({ message, isVisible, setCurrentView }) {
    const { cart } = useCart();

    return (
        <div
            className={`absolute p-4 w-full h-full flex flex-col transition-all ${
                isVisible ? '' : 'opacity-0 pointer-events-none -translate-x-10'
            }`}
        >
            <p className='text-xl font-bold text-center'>ההזמנה שלי</p>

            <div className='flex flex-row-reverse items-center text-right w-full mt-5'>
                <MdOutlineComment size={22} color='#8b5cf6' className='ml-3' />

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
                    onClick={() => setCurrentView('editMessage')}
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

            {cart.items.length >= 1 && (
                <div className='absolute inset-x-3 bottom-3'>
                    <button
                        onClick={() => setCurrentView('makeOrder')}
                        className='flex justify-between bg-[#8b5cf6] w-full
                        py-3 px-4 mt-2 rounded-md shadow-lg text-white transition'
                    >
                        <p>{cart.price} ₪</p>
                        <p className='font-semibold'>הזמן</p>
                    </button>
                </div>
            )}
        </div>
    );
}
